##Usage

	var result = run("1+2*3/4+((5-6)*(7/8))*9/10");


	>>>	  1 + 2 * 3 / 4 + ( ( 5 - 6 ) * ( 7 / 8 ) ) * 9 / 10
		= 1 + 2 * 3 / 4 + ( -1 * ( 7 / 8 ) ) * 9 / 10
		= 1 + 2 * 3 / 4 + ( -1 * 0.875 ) * 9 / 10
		= 1 + 2 * 3 / 4 + -0.875 * 9 / 10
		= 1 + 6 / 4 + -0.875 * 9 / 10
		= 1 + 1.5 + -0.875 * 9 / 10
		= 1 + 1.5 + -7.875 / 10
		= 1 + 1.5 + -0.7875
		= 2.5 + -0.7875
		= 1.7125