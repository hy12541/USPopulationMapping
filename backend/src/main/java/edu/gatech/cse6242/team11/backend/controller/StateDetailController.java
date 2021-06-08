package edu.gatech.cse6242.team11.backend.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.gatech.cse6242.team11.backend.model.StateInformation;

@RestController
@RequestMapping("/state")
@CrossOrigin
public class StateDetailController {

	@Autowired
	Set<StateInformation> stateInformation;

	@GetMapping()
	public Set<StateInformation> getAllStateInformation() {
		return stateInformation;
	}

	@GetMapping("/{stateFips}")
	public ResponseEntity<StateInformation> getStateInformationByFips(@PathVariable int stateFips) {
		for (StateInformation state : this.stateInformation) {
			if (state.getStateFips() == stateFips) {
				return new ResponseEntity<>(state, HttpStatus.OK);
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
