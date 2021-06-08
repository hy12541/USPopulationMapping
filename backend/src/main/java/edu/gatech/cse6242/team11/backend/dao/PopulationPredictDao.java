package edu.gatech.cse6242.team11.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.gatech.cse6242.team11.backend.repository.PopulationEstimateKey;
import edu.gatech.cse6242.team11.backend.repository.PopulationPredict;

public interface PopulationPredictDao extends JpaRepository<PopulationPredict, PopulationEstimateKey> {
	List<PopulationPredict> findByFips(int fips);

	List<PopulationPredict> findByYear(int year);

	PopulationPredict findByFipsAndYear(int fips, int year);

}
