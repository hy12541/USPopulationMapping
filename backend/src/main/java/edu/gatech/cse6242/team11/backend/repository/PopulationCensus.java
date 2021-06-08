package edu.gatech.cse6242.team11.backend.repository;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "population_estimate")
@IdClass(PopulationEstimateKey.class)
public class PopulationCensus {
	@Id
	@Column(name = "fips")
	private int fips;
	@Id
	@Column(name = "year")
	private int year;
	@Column(name = "population")
	private int population;

	public PopulationCensus() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PopulationCensus(int fips, int year, int population) {
		super();
		this.fips = fips;
		this.year = year;
		this.population = population;
	}

	public int getFips() {
		return fips;
	}

	public void setFips(int fips) {
		this.fips = fips;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getPopulation() {
		return population;
	}

	public void setPopulation(int population) {
		this.population = population;
	}

	@Override
	public String toString() {
		return "PopulationEstimate [fips=" + fips + ", year=" + year + ", population=" + population + "]";
	}

}
