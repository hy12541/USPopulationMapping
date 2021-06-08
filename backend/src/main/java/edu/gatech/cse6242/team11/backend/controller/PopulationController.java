package edu.gatech.cse6242.team11.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.gatech.cse6242.team11.backend.dao.CountyDetailDao;
import edu.gatech.cse6242.team11.backend.dao.PopulationEstimateDao;
import edu.gatech.cse6242.team11.backend.model.CountyPopulation;
import edu.gatech.cse6242.team11.backend.model.StatePopulation;
import edu.gatech.cse6242.team11.backend.repository.CountyDetail;
import edu.gatech.cse6242.team11.backend.repository.PopulationEstimate;
import edu.gatech.cse6242.team11.backend.utils.FipsParser;

@CrossOrigin
@RestController
@RequestMapping("/population")

public class PopulationController {

	@Autowired
	PopulationEstimateDao populationEstimateDao;
	@Autowired
	CountyDetailDao countyDetailDao;
	@Autowired
	FipsParser fipsParser;
	@Autowired
	Map<Integer, CountyDetail> countyDetailLookup;

	@GetMapping("/state/{stateId}/year/{year}")
	public ResponseEntity<StatePopulation> getPopulationByStateByYear(@PathVariable int stateId,
			@PathVariable int year) {
		StatePopulation result = new StatePopulation();
		List<CountyDetail> countiesInState = countyDetailDao.findByState(stateId);
		CountyDetail sampleCounty = countyDetailDao.findFirstByState(stateId);

		try {
			int totalPopulation = countiesInState.stream()
					.map(county -> populationEstimateDao.findByFipsAndYear(county.getFips(), year))
					.filter(record -> record.getYear() == year).map(PopulationEstimate::getPopulation)
					.reduce((a, b) -> a + b).orElse(0);

			result.setPopulation(totalPopulation);
			result.setYear(year);
			result.setStateFips(stateId);
			result.setStateName(sampleCounty.getStateName());
			result.setStateAbbr(sampleCounty.getStateAbbr());

			return new ResponseEntity<StatePopulation>(result, HttpStatus.OK);

		} catch (NullPointerException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);

		}
	}

	@GetMapping("/year/{year}/state")
	public ResponseEntity<List<StatePopulation>> getAllStatePopulationByYear(@PathVariable int year) {
		List<StatePopulation> result = new ArrayList<>();
		Map<Integer, Integer> statePopulationMap = new HashMap<>();

		List<PopulationEstimate> countiesInSelectedYear = populationEstimateDao.findByYear(year);
		countiesInSelectedYear.forEach(countyPopulation -> {
			int stateFips = fipsParser.getStateFipsFromFullFips(countyPopulation.getFips());
			if (statePopulationMap.containsKey(stateFips)) {
				statePopulationMap.put(stateFips, countyPopulation.getPopulation() + statePopulationMap.get(stateFips));
			} else {
				statePopulationMap.put(stateFips, countyPopulation.getPopulation());
			}
		});
		statePopulationMap.forEach((stateFips, statePopulationNumber) -> {
			CountyDetail sampleCounty = countyDetailDao.findFirstByState(stateFips);
			StatePopulation statePopulationRecord = new StatePopulation();

			statePopulationRecord.setPopulation(statePopulationNumber);
			statePopulationRecord.setStateAbbr(sampleCounty.getStateAbbr());
			statePopulationRecord.setStateFips(stateFips);
			statePopulationRecord.setStateName(sampleCounty.getStateName());
			statePopulationRecord.setYear(year);

			result.add(statePopulationRecord);
		});
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/state/{stateId}")
	public ResponseEntity<List<StatePopulation>> getPopulationByStateForAllYears(@PathVariable int stateId) {
		List<StatePopulation> result = new ArrayList<>();
		List<CountyDetail> countiesInSelectedState = countyDetailDao.findByState(stateId);
		Map<Integer, Integer> yearPopulationMap = new HashMap<>();
		CountyDetail sampleCounty = countyDetailDao.findFirstByState(stateId);

		countiesInSelectedState.forEach(county -> {
			List<PopulationEstimate> countyAllYearRecord = populationEstimateDao.findByFips(county.getFips());
			countyAllYearRecord.forEach(countyRecord -> {
				if (yearPopulationMap.containsKey(countyRecord.getYear())) {
					yearPopulationMap.put(countyRecord.getYear(),
							yearPopulationMap.get(countyRecord.getYear()) + countyRecord.getPopulation());
				} else {
					yearPopulationMap.put(countyRecord.getYear(), countyRecord.getPopulation());
				}
			});
		});
		yearPopulationMap.forEach((year, population) -> {
			if (population != 0) {
				StatePopulation statePopulation = new StatePopulation();

				statePopulation.setPopulation(population);
				statePopulation.setStateAbbr(sampleCounty.getStateAbbr());
				statePopulation.setStateFips(stateId);
				statePopulation.setStateName(sampleCounty.getStateName());
				statePopulation.setYear(year);

				result.add(statePopulation);

			}
		});
		if (result.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/year/{year}/county")
	public ResponseEntity<List<CountyPopulation>> getAllCountyPopulationByYear(@PathVariable int year) {
		List<CountyPopulation> result = new ArrayList<>();

		List<PopulationEstimate> countyRecordInSelectedYear = populationEstimateDao.findByYear(year);
		countyRecordInSelectedYear.forEach(record -> {
			CountyPopulation countyPopulation = new CountyPopulation();

			countyPopulation.setCountyFips(fipsParser.getCountyFipsFromFullFips(record.getFips()));
			countyPopulation.setCountyName(countyDetailLookup.get(record.getFips()).getCountyName());
			countyPopulation.setFips(record.getFips());
			countyPopulation.setPopulation(record.getPopulation());
			countyPopulation.setStateAbbr(countyDetailLookup.get(record.getFips()).getStateAbbr());
			countyPopulation.setStateFips(fipsParser.getStateFipsFromFullFips(record.getFips()));
			countyPopulation.setStateName(countyDetailLookup.get(record.getFips()).getStateName());
			countyPopulation.setYear(year);
			result.add(countyPopulation);
		});
		if (result.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/state/{stateId}/year/{year}/county")
	public ResponseEntity<List<CountyPopulation>> getCountyPopulationByStateByYear(@PathVariable int stateId,
			@PathVariable int year) {
		List<CountyPopulation> result = new ArrayList<>();

		List<PopulationEstimate> countyRecordInSelectedYear = populationEstimateDao.findByYear(year);
		countyRecordInSelectedYear.forEach(record -> {
			if (fipsParser.getStateFipsFromFullFips(record.getFips()) == stateId) {
				CountyPopulation countyPopulation = new CountyPopulation();

				countyPopulation.setCountyFips(fipsParser.getCountyFipsFromFullFips(record.getFips()));
				countyPopulation.setCountyName(countyDetailLookup.get(record.getFips()).getCountyName());
				countyPopulation.setFips(record.getFips());
				countyPopulation.setPopulation(record.getPopulation());
				countyPopulation.setStateAbbr(countyDetailLookup.get(record.getFips()).getStateAbbr());
				countyPopulation.setStateFips(fipsParser.getStateFipsFromFullFips(record.getFips()));
				countyPopulation.setStateName(countyDetailLookup.get(record.getFips()).getStateName());
				countyPopulation.setYear(year);
				result.add(countyPopulation);

			}
		});

		if (result.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/fips/{fips}/year/{year}")
	public ResponseEntity<CountyPopulation> getPopulationByCountyByYear(@PathVariable int fips,
			@PathVariable int year) {
		CountyPopulation result = new CountyPopulation();

		PopulationEstimate populationEstimate = populationEstimateDao.findByFipsAndYear(fips, year);
		if (populationEstimate == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		CountyDetail countyDetail = countyDetailLookup.get(fips);

		result.setCountyFips(fipsParser.getCountyFipsFromFullFips(fips));
		result.setCountyName(countyDetail.getCountyName());
		result.setFips(fips);
		result.setPopulation(populationEstimate.getPopulation());
		result.setStateAbbr(countyDetail.getStateAbbr());
		result.setStateFips(fipsParser.getStateFipsFromFullFips(fips));
		result.setStateName(countyDetail.getStateName());
		result.setYear(year);

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

}
