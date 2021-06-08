package edu.gatech.cse6242.team11.backend.model;

public class StateInformation {

	private int stateFips;
	private String stateName;
	private String StateAbbr;

	public StateInformation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StateInformation(int stateFips, String stateName, String stateAbbr) {
		super();
		this.stateFips = stateFips;
		this.stateName = stateName;
		StateAbbr = stateAbbr;
	}

	@Override
	public String toString() {
		return "StateInformation [stateFips=" + stateFips + ", stateName=" + stateName + ", StateAbbr=" + StateAbbr
				+ "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((StateAbbr == null) ? 0 : StateAbbr.hashCode());
		result = prime * result + stateFips;
		result = prime * result + ((stateName == null) ? 0 : stateName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		StateInformation other = (StateInformation) obj;
		if (StateAbbr == null) {
			if (other.StateAbbr != null)
				return false;
		} else if (!StateAbbr.equals(other.StateAbbr))
			return false;
		if (stateFips != other.stateFips)
			return false;
		if (stateName == null) {
			if (other.stateName != null)
				return false;
		} else if (!stateName.equals(other.stateName))
			return false;
		return true;
	}

	public int getStateFips() {
		return stateFips;
	}

	public void setStateFips(int stateFips) {
		this.stateFips = stateFips;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public String getStateAbbr() {
		return StateAbbr;
	}

	public void setStateAbbr(String stateAbbr) {
		StateAbbr = stateAbbr;
	}

}
