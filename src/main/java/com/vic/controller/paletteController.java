package com.vic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vic.model.HTriangle;
import com.vic.model.HTriangleDetails;

@RestController
public class paletteController {

	@PostMapping("/palette/save")
	public void savePalette(@RequestBody HTriangleDetails htriangledetails) {
		HTriangle htriangle = new HTriangle();
		htriangle.setOption1(htriangledetails.getOption1());
		htriangle.setOption2(htriangledetails.getOption2());
		htriangle.setOption3(htriangledetails.getOption3());
		htriangle.setPalette(htriangledetails.getPalette());
		System.out.println(htriangle);
	}
}
