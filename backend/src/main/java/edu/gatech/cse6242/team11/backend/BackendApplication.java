package edu.gatech.cse6242.team11.backend;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import edu.gatech.cse6242.team11.backend.dao.CountyDetailDao;
import edu.gatech.cse6242.team11.backend.model.StateInformation;
import edu.gatech.cse6242.team11.backend.repository.CountyDetail;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	CountyDetailDao countyDetailDao;

	@Bean
	public Map<Integer, CountyDetail> countyDetailLookUp() {

		Map<Integer, CountyDetail> result = new HashMap<>();
		List<CountyDetail> countyDetailList = countyDetailDao.findAll();
		countyDetailList.forEach(countyDetail -> {
			result.put(countyDetail.getFips(), countyDetail);
		});

		return result;

	}

	@Bean
	public Set<StateInformation> stateDetailLookup() {
		Set<StateInformation> result = new HashSet<>();
		this.countyDetailLookUp().forEach((countyFips, countyDetail) -> {
			StateInformation stateInformation = new StateInformation();
			stateInformation.setStateAbbr(countyDetail.getStateAbbr());
			stateInformation.setStateFips(countyDetail.getState());
			stateInformation.setStateName(countyDetail.getStateName());

			result.add(stateInformation);
		});

		return result;
	}
}
