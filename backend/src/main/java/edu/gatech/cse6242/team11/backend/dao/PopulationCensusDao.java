package edu.gatech.cse6242.team11.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.gatech.cse6242.team11.backend.repository.PopulationCensus;
import edu.gatech.cse6242.team11.backend.repository.PopulationEstimateKey;

public interface PopulationCensusDao extends JpaRepository<PopulationCensus, PopulationEstimateKey> {
	List<PopulationCensus> findByFips(int fips);

	List<PopulationCensus> findByYear(int year);

	PopulationCensus findByFipsAndYear(int fips, int year);

}
