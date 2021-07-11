// Define fundamental variables
var Nexp;
var kcol_min, kcol_max;
var gcol_min, gcol_max;
var numg_bed_min, numg_bed_max, numg_bed;
var diag_int_min, diag_int_max, diag_int_ori;
var diag_bed_min, diag_bed_max, diag_bed_ori;
var rhog_int_min, rhog_int_max;
var rhog_bed_min, rhog_bed_max;
var Amp_min, Amp_max, Amp_ori;
var freq_min, freq_max; 
var rhog_bed_list = [];
var rhog_int_list = [];

// Define global variables for walls
var L, R;
var w1, w2, w3, w4, w5, w6, w7, w8;
var WL, WR, WT, WB;
var wall, Nw, kw;

// Define global variables for parameters
var gacc, kcol, gcol;

// Define global variables for simulation
var tstep, tbeg, tend, tdata, tproc, proc, t, Ndata, idata, tdelay, tvibmax, tdummy;

// Define global variables for coordinates
var ymin, zmin, ymax, zmax, YMIN, ZMIN, YMAX, ZMAX;

// Define global variables for box
var boxh, boxw, boxt;

// Define global variables for grains
var int_pos, diag_int, diag_bed, rhog_int, rhog_bed, intnum, numg2, geng, r, v, m, D;

// Define global variables for shaker
var avib1, yvib1, vvib1, avib2, yvib2, vvib2;
var Amp, freq, omega, xvib, vibh, h, vibOn, tvib, gamma;

// Define global variables for paramaters
var Zs, Contactopy, nexp;

// Define global variables for visual elements
var taInPar 	// text area for input parameters
var caOut 		// output canvas 
var taConsole	// text area for console
var taConsoleH	// header for taConsole
var taResult	// text area for result
var taOutPos	// text area for output position
var taInPos		// text area for input position

var btClear, btLoad, btRead, btStart, btStartVib, btInfo, btHelp, btAnim;

var cScale = 4.000;
var taConsoleON = true;
var show_animation;

main()

function main(){
	setElementsLayout();	
	initParams();
}

// Set layout of all elements
function setElementsLayout() {

	document.body.style.background = "#eee" // "#B3FFF9";
	document.body.align = "center";
	
	// Create text header
	header0 = document.createElement("h1");
	header0.innerHTML = "Vertical Vibration on One Intruder System";
	header0.align = "center";

	// Create output canvas & size
	caOut = document.createElement("canvas");
	caOut.width = 351;
	caOut.height = 760;
	boxw = caOut.width*0.001;
	boxh = caOut.height*0.001;
	caOut.style.width = caOut.width + "px";
	caOut.style.height = caOut.height + "px";
	caOut.style.float = "left";
	caOut.style.border = "#aaa 10px solid"

	var cx = caOut.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, caOut.width, caOut.height);
	YMIN = 0;
	ZMIN = caOut.height;
	YMAX = caOut.width;
	ZMAX = 0;
	
	// Create text area for input parameters
	taInPar = document.createElement("textarea");
	taInPar.style.width = "500px";
	taInPar.style.height = (parseInt(caOut.style.height)/2)+"px";
	taInPar.style.overflowY = "scroll";
	taInPar.style.overflowX = "scroll";
	taInPar.style.float = "left";
	taInPar.style.background = "#fff";
	
	// Create header text area for input parameters 
	taInParH = document.createElement("textarea");
	taInParH.style.width = parseInt(taInPar.style.width)+"px";
	taInParH.style.height = "15px";
	taInParH.style.float = "left";
	taInParH.style.background = "#eee";
	tout(taInParH, "----- Input parameters -----");

		
	// Create text area for "console"
	taResult = document.createElement("textarea");
	taResult.style.width = parseInt(taInPar.style.width)+"px";	
	taResult.style.height = (parseInt(caOut.style.height)/2)
						+"px";;
	taResult.style.overflowY = "scroll";
	taResult.style.overflowX = "scroll";
	taResult.style.float = "left";
	taResult.style.background = "#fff";
	
	// Create header text area for console 
	taResultH = document.createElement("textarea");
	taResultH.style.width = parseInt(taInPar.style.width)+"px";
	taResultH.style.height = "15px";
	taResultH.style.float = "left";
	taResultH.style.background = "#eee";
	tout(taResultH, "----- Data Output -----");

	// Create text area for output parameters
	taConsole = document.createElement("textarea");
	taConsole.style.width = 270+"px";	
	taConsole.style.height = (parseInt(taInPar.style.height) 
						+ parseInt(taResult.style.height))/2 
						+ "px";
	taConsole.style.overflowY = "scroll";
	taConsole.style.overflowX = "scroll";
	taConsole.style.float = "left";
	taConsole.style.background = "#fff";

	// Create header text area for output parameters 
	taConsoleH = document.createElement("textarea");
	taConsoleH.style.width = parseInt(taConsole.style.width)+"px";
	taConsoleH.style.height = "15px";
	taConsoleH.style.float = "left";
	taConsoleH.style.background = "#eee";
	tout(taConsoleH, "----- Console -----");
	
	// Create text area for input position
	taInPos = document.createElement("textarea");
	taInPos.style.width = "270px";
	taInPos.style.height = (parseInt(taInPar.style.height) 
						+ parseInt(taResult.style.height))/2 
						+ "px";
	taInPos.style.overflowY = "scroll";
	taInPos.style.float = "left";
	taInPos.style.background = "#fff";
	
	// Create header text area for input/output position 
	taInPosH = document.createElement("textarea");
	taInPosH.style.width = parseInt(taInPos.style.width)+"px";
	taInPosH.style.height = "15px";
	taInPosH.style.float = "left";
	taInPosH.style.background = "#eee";
	tout(taInPosH, "----- Input/output position -----");
	
	// Create buttons
	btClear = document.createElement("button");
	btClear.innerHTML = "Clear";
	btClear.style.width = "75px";
	btClear.addEventListener("click", buttonClick);

	btLoad = document.createElement("button");
	btLoad.innerHTML = "Load";
	btLoad.style.width = "75px";
	btLoad.addEventListener("click", buttonClick);
		
	btRead = document.createElement("button");
	btRead.innerHTML = "Read";
	btRead.style.width = "75px";
	btRead.disabled = true;
	btRead.addEventListener("click", buttonClick);

	btStart = document.createElement("button");
	btStart.innerHTML = "Start Simulation";
	btStart.style.width = "75px";
	btStart.disabled = true;
	btStart.addEventListener("click", buttonClick);

	btStartVib = document.createElement("button");
	btStartVib.innerHTML = "Stop Vibration";
	btStartVib.style.width = "75px";
	btStartVib.disabled = false;
	btStartVib.addEventListener("click", buttonClick);
	
	btGetPosition = document.createElement("button");
	btGetPosition.innerHTML = "Show Pos";
	btGetPosition.style.width = "75px";
	btGetPosition.addEventListener("click", buttonClick);

	btInfo = document.createElement("button");
	btInfo.innerHTML = "Info";
	btInfo.style.width = "75px";
	btInfo.addEventListener("click", buttonClick);
	
	btHelp = document.createElement("button");
	btHelp.innerHTML = "Help";
	btHelp.style.width = "75px";
	btHelp.addEventListener("click", buttonClick);	

    btAnim = document.createElement("button");
	btAnim.innerHTML = "Animation ON";
	btAnim.style.width = "75px";
	btAnim.addEventListener("click", buttonClick);
	
	// Create header division
	var divHead = document.createElement("div");
	divHead.style.width = parseInt(caOut.style.width) + 10
						+ parseInt(btClear.style.width)
						+ parseInt(taInPar.style.width)
						+ parseInt(taInPos.style.width)
						+ 30 + "px";
	divHead.style.height = 50 + "px";
	divHead.style.align = "center";
	
	// Create dynamic division 
	var divDyn = document.createElement("div");
	divDyn.style.width = parseInt(caOut.style.width)+25+"px";
	divDyn.style.height = parseInt(caOut.style.height)
					+"px";
	divDyn.style.float = "left"
					
	// Create dynamic division 1 -> caOut + taConsole
	var divDyn1 = document.createElement("div");
	divDyn1.style.width = parseInt(caOut.style.width)	
					+ "px";
	divDyn1.style.height = parseInt(caOut.style.height)
					+ 10 + "px";
	divDyn1.float = "left";
					
	// Create button division
	var divBut = document.createElement("div");
	divBut.style.width = "80px";
	divBut.style.height = parseInt(caOut.style.height) + "px";
	divBut.style.float = "left";
	divBut.style.background = "#eee"

	// Create control division
	var divCont1 = document.createElement("div");
	divCont1.style.width = parseInt(taInPar.style.width)+10+"px";
	divCont1.style.height = parseInt(divBut.style.height);
	divCont1.style.float = "left";

	var divCont2 = document.createElement("div");
	divCont2.style.width = 270 + 10 + "px";
	divCont2.style.height = parseInt(divBut.style.height);
	divCont2.style.float = "left";

	// Create main division
	var divMain = document.createElement("div");
	divMain.style.width = parseInt(divDyn.style.width)
						+ parseInt(divBut.style.width)
						+ parseInt(divCont1.style.width)
						+ parseInt(divCont2.style.width)
						+ "px";
	divMain.style.height = parseInt(caOut.style.height)
//						+ parseInt(taConsoleH.style.height)
//						+ parseInt(taConsole.style.height)
						"px";
	divMain.style.background = "#fff";
	divMain.style.align = "center";

	
	// Set layout of visual component
	document.body.append(divHead);
		divHead.append(header0);
	document.body.append(divMain);
		divMain.append(divDyn);
			divDyn.append(divDyn1);
				divDyn1.append(caOut);
		divMain.append(divBut);
                divBut.append(btClear);
				divBut.append(btLoad);
				divBut.append(btRead);
				divBut.append(btStart);
                divBut.append(btAnim);
				divBut.append(btStartVib);
				divBut.append(btGetPosition);
				divBut.append(btInfo);
				divBut.append(btHelp);
		divMain.append(divCont1);
			divCont1.append(taInParH);
			divCont1.append(taInPar);
			divCont1.append(taResultH);
			divCont1.append(taResult);
		divMain.append(divCont2);
			divCont2.append(taInPosH);
			divCont2.append(taInPos);
			divCont2.append(taConsoleH);
			divCont2.append(taConsole);
}

// Draw system in the box
function drawSystem(){
	var cx = caOut.getContext("2d");
	for(var i = 0; i < numg; i++) {
		var yy = r[i].y;
		var zz = r[i].z;
		var R1 = transform(yy, zz);
		var R2 = transform(yy + 0.5 * D[i], zz);
		
		cx.beginPath();
		cx.arc(R1.Y, R1.Z, (R2.Y - R1.Y), 0, 2 * Math.PI); 
		if(i==0) {
			cx.fillStyle = "#0E9944";		// for grains 1: green
		} else {
			cx.fillStyle = "#0000FF";
		}
		cx.closePath();
		cx.fill();
		
		cx.beginPath();
		cx.arc(R1.Y, R1.Z, (R2.Y - R1.Y), 0, 2*Math.PI);
		cx.strokeStyle = "#000";
		cx.stroke();
	}

	var VIB1 = transform(-boxw,yvib1);
	var VVIB1 = transform(1,0.8);
	cx.beginPath();
	cx.rect(VIB1.Y, VIB1.Z,VVIB1.Y,2);
	cx.fillStyle = "#000";
	cx.fill();
	cx.closePath();
	
	var VIB2 = transform(-boxw,yvib2);
	var VVIB2 = transform(1,0.8);
	cx.beginPath();
	cx.rect(VIB2.Y, VIB2.Z,VVIB2.Y,2);
	cx.fillStyle = "#000";
	cx.fill();
	cx.closePath();	
	
	
	// Transform real coordinates to canvas coordinates
	function transform(yy, zz) {
		var YY = (yy - ymin) / (ymax - ymin) * (YMAX - YMIN)
			+ YMIN;
		var ZZ = (zz - zmin) / (zmax - zmin) * (ZMAX - ZMIN)
			+ ZMIN;
		return {Y: YY, Z: ZZ};
	}
}
	
// Clear all
function clearAll() {
	taInPar.value = "";
	taConsole.value = "";
	//taOutPos.value = "";
	taResult.value = "";
	clearCanvas();
}

function clearCanvas() {
	var cx = caOut.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, caOut.width, caOut.height);	
}

// Load parameters to taConsole
function loadParameters() {
	var lines = "";
	//lines += "# Environment\n";
	//lines += "GACC 9.807\n";          // Gravitation      m/s2
	//lines += "KCOL 1000\n";           // Normal constant  N/m
	//lines += "GCOL 300\n";            // Normal constant  N/m
	//lines += "RHOF 1.2\n";		    // Air density kg/m3
	//lines += "MIUF 0.02\n";		    // Friction damping
	
	//lines += "\n";
	lines += "# Simulation\n";
	lines += "NEXP 20\n";               // Number of experiment
	lines += "TSTEP 0.001\n";           // Time step        s
	lines += "TBEG 0\n";                // Initial time     s
	lines += "TEND 18\n";               // Final time       s
	lines += "TDATA 0.01\n";            // Data period      s
	lines += "TPROC 0.01\n";            // Event period     s
	lines += "TDELAY 1.00\n";           // Delay time       s

	lines += "\n";
	lines += "# Vibrator\n";
	lines += "FREQ 0 to 10\n";		    // Shaker frequency	Hz
	lines += "AMP 0.0060\n";		    // Shaker amplitud	m
	lines += "VIBH 0.19\n";		        // Shaker height	m
	
	lines += "\n";
	lines += "# Grains\n";
    lines += "INT_POS 0\n"              // Intruder initial horizontal position
	lines += "DIAG_INT 0.0200\n"    	// Intruder diameter        m
	lines += "DIAG_BED 0.0060\n"    	// Bed diameter             m
	lines += "RHOG_INT 700 to 1400\n";    	// Intruder density range   kg/m3
	lines += "RHOG_BED 700 to 1400\n";    	// Bed density range        kg/m3
	lines += "NUMG_BED 150\n";          // Number of bed
	lines += "GENG 0\n";        	    // Generation type : 0 random
	lines += "FIXPOS 0\n"			    // Position input : 0 free falling, 1 fix
	lines += "NORMAL_TYPE 0\n"		    // Normal type
	
	var ta = arguments[0];
	ta.value = lines;
	ta.scrollTop = ta.scrollHeight;
}

// Read parameters
function readParameters() {
	var lines = arguments[0].value;
	
    N_exp = getValue(lines,"NEXP");

	// Get parameters information
	gacc = 9.807;
	kcol = 1000;
	gcol = 300;
	rhof = 1.2;
	miuf = 0.02;

	// Get simulation information
	tstep   = getValue(lines, "TSTEP");
	tbeg    = getValue(lines, "TBEG");
	tend    = getValue(lines, "TEND");
	tdata   = getValue(lines, "TDATA");
	tproc   = getValue(lines, "TPROC")*100;
	tdelay  = getValue(lines, "TDELAY");
	tend    = tend + tdelay;	
	
	// Get shaker information
	Amp_ori = getValue(lines, "AMP");
	h       = getValue(lines, "VIBH") * cScale;
    
    // Get frequency random range -> freq defined in initParams 
    freq_min = getValueArray(lines, "FREQ",0);
    freq_max = getValueArray(lines, "FREQ",2);

	// Get grains fix information
    int_pos      = getValue(lines, "INT_POS") 
	diag_int_ori = getValue(lines, "DIAG_INT");
	diag_bed_ori = getValue(lines, "DIAG_BED");

    // Get random range of grain densities -> densities defined in initParams
    rhog_int_min = getValueArray(lines, "RHOG_INT",0);
    rhog_int_max = getValueArray(lines, "RHOG_INT",2);
    rhog_bed_min = getValueArray(lines, "RHOG_BED",0);
    rhog_bed_max = getValueArray(lines, "RHOG_BED",2);

	numg_bed = getValue(lines, "NUMG_BED");	
	geng = getValue(lines, "GENG");
	fixpos = getValue(lines, "FIXPOS");
	normalType = getValue(lines, "NORMAL_TYPE");
}

function initParams(){
	t        = tbeg;
	tvib     = 0.000;
	tdummy   = 0.000;
	vibOn    = false;

    freq     = (Math.random()*(freq_max-freq_min)+freq_min);
	Amp      = Amp_ori * cScale;	

	diag_int = diag_int_ori * cScale;
	diag_bed = diag_bed_ori * cScale;
    rhog_int = (Math.random()*(rhog_int_max-rhog_int_min)+rhog_int_min);
    rhog_bed = (Math.random()*(rhog_bed_max-rhog_bed_min)+rhog_bed_min);
	numg	 = numg_bed + 1;
	
	// Get coordinates information
	ymin     = -0.5*boxw;   	//getValue(lines, "YMIN");
	zmin     = -Amp;			//getValue(lines, "ZMIN");
	ymax     = 0.5*boxw;        //getValue(lines, "YMAX");
	zmax     = boxh;			//getValue(lines, "ZMAX");
	
	// Define box size, width = 2R, height = L
	R = 0.5 * boxw;         // m, boxt = boxw
	L = boxh;               // m
	
	// Set initial condition of shaker
	omega = 2*Math.PI*freq;

	yvib1 = Amp*Math.sin(omega*t+Math.PI);
	vvib1 = Amp*omega*Math.cos(omega*t+Math.PI);
	
	yvib2 = yvib1+h;
	vvib2 = vvib1;	
	
	// Define 8 points for box corners
	w1 = new Vect3(R, -R, yvib1);
	w2 = new Vect3(R, R, yvib1);
	w3 = new Vect3(-R, -R, yvib1);
	w4 = new Vect3(-R, R, yvib1);
	w5 = new Vect3(R, -R, yvib2);
	w6 = new Vect3(R, R, yvib2);
	w7 = new Vect3(-R, -R, yvib2);
	w8 = new Vect3(-R, R, yvib2);
	
	// Define 4 walls using previous points
	WL = [w1, w3, w7, w5];
	WR = [w2, w6, w8, w4];
	WT = [w5, w7, w8, w6];
	WB = [w1, w2, w4, w3];
	wall = [WL, WR, WT, WB];
	Nw = wall.length;
	
	// Calculate center of each wall
	wL = vect3Average(WL);
	wR = vect3Average(WR);
	wT = vect3Average(WT);
	wB = vect3Average(WB);
	
	// Define grains properties
	r = [];
	v = [];
	m = [];
	D = [];
	if(geng == 0) {
		for(var i = 0; i < numg; i++) {
			if(i==0){
				D.push(diag_int);
				var Rg = 0.5 * diag_int;
				//var Vg = (4 * Math.PI / 3) * Rg * Rg * Rg;		
				var Vg = Math.PI * Rg * Rg * 0.008;			 // 0.008 : thick * cScale		
				m.push(rhog_int * Vg);
			} else {
				D.push(diag_bed);
				var Rg = 0.5 * diag_bed;
				//var Vg = (4 * Math.PI / 3) * Rg * Rg * Rg;	
				var Vg = Math.PI * Rg * Rg * 0.008;
				m.push(rhog_bed * Vg);
			}
			v.push(new Vect3());
		}
		
		var Nperlayer = parseInt(0.75 * boxw / ((diag_bed)));
		var dx = boxw / Nperlayer
		var Nlayer = Math.ceil(numg / Nperlayer);

		if(fixpos == 0) {
			var k = 0;
			for(var i = 0; i < Nlayer; i++) {
				for(var j = 0; j < Nperlayer; j++) {
					if (k==0) {		                            // intruder
						var int_y = int_pos/10 * 0.5 * boxw
                        r.push(new Vect3(0,int_y,0.5*D[0]));
					}
					var x = 0;
					var rndy = 0.1 * dx * Math.random();
					var rndz = 0.1 * dx * Math.random();
					var y = -0.5 * boxw + (j + 0.5) * dx + rndy;
					var z = (i+1) * dx + rndz + D[0];
					r.push(new Vect3(x, y, z));
					k++;
					if(k >= numg) {
						break;
					}
				}
			}

		} else if(fixpos == 1) {
			// Read position
			readPosition(taInPos);
			
			for (var i=0; i < numg; i++) {
				var x = 0;
				var y = yGetPosition[i];
				var z = zGetPosition[i];
				r.push(new Vect3(x,y,z));
			}	
		}
	}
	
	// Initialize simulation parameters
	Ndata = Math.floor(tdata / tstep);
	idata = Ndata;
}

function loopSimulate() {
	initParams();
	if(show_animation != 0){
		clearCanvas();
		drawSystem();
	}
	tout(taResult, "\n" + diag_int_ori
                + "," + diag_bed_ori
                + "," + rhog_int.toFixed(2)
                + "," + rhog_bed.toFixed(2)
                + "," + freq.toFixed(2)
                + "," + Amp_ori.toFixed(3) + ","
				);
	proc = setInterval(simulate, tproc);
	nexp = nexp + 1;
}

function simulate() {
    if (t > tend) {
        btStart.innerHTML = "Start Simulation";
        btStart.disabled = true;
        btRead.disabled = false;
        taInPar.disabled = false;
        //tout(taResult, "Simulation stops, t = end\n\n");
        clearInterval(proc);
		if (nexp < N_exp) {
			loopSimulate();			
		}
    }
	
	if (t > tdelay) {
		if (t.toExponential(3) == tdelay.toExponential(3)) {	
			tout(taResult,  
				+ getContactopy() + "," 
				);
		}
		vibOn = true;
	}
	
	if (t > (tend - tdelay)) {
		vibOn = false;
		if (t.toExponential(3) == (tend-tstep).toExponential(3)){
			var z_intruder = getRise().toFixed(4);

			tout(taResult, 
				+ z_intruder + "," 
				+ getContactopy() + "," 
				//+ classification(z_intruder)
				);
		}
	}
		
    if (taConsoleON == false && t==tbeg) {
		tout(taConsole, "Output parameters are not displayed\n");
	}
	
	if (idata == Ndata) {
        var digit = -Math.floor(Math.log10(tdata));
        var tt = t.toExponential(digit);
		if (taConsoleON == true) { // && vibOn == true) {
			if (t == 0) {
				tout(taConsole, "Experiment #" + nexp +" begin \n"
								+ "- freq    = " + freq.toFixed(2) + " Hz\n"
								+ "- rho_int = " + rhog_int.toFixed(2) + " kg/m3\n"
								+ "- rho_bed = " + rhog_bed.toFixed(2) + " kg/m3\n");
			}
			//var z_intruder = ((r[0].z-yvib1)/diag_bed).toExponential(2);
			//var z_intruder = getRise().toFixed(4);
		}
        if(show_animation != 0){
			clearCanvas();
			drawSystem();
		}
        idata = 0;
    }
		
	if(vibOn == true){
		yvib1 = Amp*Math.sin(omega*tvib+Math.PI);
		vvib1 = Amp*omega*Math.cos(omega*tvib+Math.PI);
		vvib2 = vvib1;
		yvib2 = h + yvib1;	
		tvib = tvib + tstep;
	} else {
		vvib1 = 0;
		vvib2 = 0;
	}

	var ww1,ww2,ww3,ww4,ww5,ww6,ww7,ww8, WWL,WWR, WWT, WWB;
	// redefine wall top and bottom
	ww1 = new Vect3(R, -R, yvib1);
    ww2 = new Vect3(R, R, yvib1);
    ww3 = new Vect3(-R, -R, yvib1);
    ww4 = new Vect3(-R, R, yvib1);
    ww5 = new Vect3(R, -R, yvib2);
    ww6 = new Vect3(R, R, yvib2);
    ww7 = new Vect3(-R, -R, yvib2);
    ww8 = new Vect3(-R, R, yvib2);
	
    WWL = [ww1, ww3, ww7, ww5];
    WWR = [ww2, ww6, ww8, ww4];
    WWT = [ww5, ww7, ww8, ww6];
    WWB = [ww1, ww2, ww4, ww3];
    wall = [WWL, WWR, WWT, WWB];
	
    var F = [];
    for (var i = 0; i < numg; i++) {
        F.push(new Vect3());
    }
	
	// gravitational force
    for (var i = 0; i < numg; i++) {
        var Fg = new Vect3(0, 0, m[i] * -gacc);
        F[i] = Vect3.add(F[i], Fg);
    }
	
	// calculate damping background
	for (var i = 0; i < numg; i++) {
		var Fdrag = Vect3.mul(-miuf,v[i]);
        F[i] = Vect3.add(F[i], Fdrag);
    }	
	
	// normal force with wall
    for (var i = 0; i < numg; i++) {
        var Fw = new Vect3();
        for (var j = 0; j < Nw; j++) {
            var wj = wall[j];
            var wc = vect3Average(wj);
            var Rg = 0.5 * D[i];			
            var nw = Vect3.cross(
				Vect3.sub(wj[1], wj[0]), 
				Vect3.sub(wj[2], wj[0])
			).unit();
            var rij = Vect3.dot(Vect3.sub(r[i], wc), nw);
            var ksi = Math.max(0, Rg - rij);
			var fw1 = Vect3.mul(kcol*ksi, nw);
			
			if (j==2 || j==3) {
				var vWall = new Vect3(0,0,vvib1);
			} else {
				var vWall = new Vect3();
			}
			var vij = Vect3.sub(v[i], vWall);
			var uij = vij.len() * Math.sign(ksi);
			var ksidot = uij * Math.sign(ksi);
			var fw2 = Vect3.mul(-gcol*ksidot*m[i],vij.unit()); 
			
			var hertzian = Math.sqrt((Rg - rij)/(Rg));
            Fw = Vect3.add(Fw, Vect3.add(fw1,fw2));
			
        }
        F[i] = Vect3.add(F[i], Fw);
    }
	
	if(normalType==0){
		// normal force with other grain (Silbert --> with meff)
		for (var i = 0; i < numg; i++) {
			var Fn = new Vect3();
			for (var j = 0; j < numg; j++) {
				if (j != i) {
					var rij = Vect3.sub(r[i], r[j]);
					var nij = rij.unit();
					var lij = rij.len();
					var ksi = Math.max(0, 0.5 * (D[i] + D[j]) - lij);
					var fn1 = kcol * ksi;
					var Fn1 = Vect3.mul(fn1, nij);				

					var meff = m[i]*m[j]/(m[i]+m[j]);
					var vij = Vect3.sub(v[i], v[j]);
					var uij = vij.len() * Math.sign(ksi);
					var ksidot = uij * Math.sign(ksi);
					var fn2 = -gcol * ksidot * meff;
					var Fn2 = Vect3.mul(fn2, vij.unit());				
					
					Fn = Vect3.add(Fn, Vect3.add(Fn1, Fn2));		

				}
			}
			F[i] = Vect3.add(F[i], Fn);
		}
	}

	else if(normalType==1){
		// normal force with other grain (Silbert Hertzian --> with meff)
		for (var i = 0; i < numg; i++) {
			var Fn = new Vect3();
			for (var j = 0; j < numg; j++) {
				if (j != i) {
					var rij = Vect3.sub(r[i], r[j]);
					var nij = rij.unit();
					var lij = rij.len();
					var ksi = Math.max(0, 0.5 * (D[i] + D[j]) - lij);
					var fn1 = kcol * ksi;
					var Fn1 = Vect3.mul(fn1, nij);				

					var meff = m[i]*m[j]/(m[i]+m[j]);
					var vij = Vect3.sub(v[i], v[j]);
					var uij = vij.len() * Math.sign(ksi);
					var ksidot = uij * Math.sign(ksi);
					var fn2 = -gcol * ksidot * meff;
					var Fn2 = Vect3.mul(fn2, vij.unit());				
					var hertzian = Math.sqrt(ksi/(0.5*(D[i]+D[j])));
					Fn = Vect3.add(Fn, Vect3.mul(hertzian,Vect3.add(Fn1, Fn2)));		

				}
			}
			F[i] = Vect3.add(F[i], Fn);
		}		

	}
	else if(normalType==2){
		// normal force with other grain (Schafer --> without meff)
		for (var i = 0; i < numg; i++) {
			var Fn = new Vect3();
			for (var j = 0; j < numg; j++) {
				if (j != i) {
					var rij = Vect3.sub(r[i], r[j]);
					var nij = rij.unit();
					var lij = rij.len();
					var ksi = Math.max(0, 0.5 * (D[i] + D[j]) - lij);
					var fn1 = kcol/1 * ksi;
					var Fn1 = Vect3.mul(fn1, nij);				

					var vij = Vect3.sub(v[i], v[j]);
					var uij = vij.len() * Math.sign(ksi);
					var ksidot = uij * Math.sign(ksi);
					var gcoln = gcol/1000;
					var fn2 = -gcoln * ksidot;
					var Fn2 = Vect3.mul(fn2, vij.unit());				
					
					Fn = Vect3.add(Fn, Vect3.add(Fn1, Fn2));		

				}
			}
			F[i] = Vect3.add(F[i], Fn);
		}
	}
			
    for (var i = 0; i < numg; i++) {
        var a = Vect3.div(F[i], m[i]);
        v[i] = Vect3.add(v[i], Vect3.mul(tstep, a));
        r[i] = Vect3.add(r[i], Vect3.mul(tstep, v[i]));
    }
    idata++;

    t += tstep;
}

// Get position each grain
function getPosition() {
	tout(taInPos, "// Get position at t="+t+"\n");
	tout(taInPos,"YGET ");
	for(var i=0; i<numg; i++){
		tout(taInPos, r[i].y);
		if(i<(numg-1)) {
			tout(taInPos, " ");
			}
	}
	tout(taInPos, "\n");
	
	tout(taInPos,"ZGET ");
	for(var i=0; i<numg; i++){
		tout(taInPos, r[i].z);
		if(i<(numg-1)) {
			tout(taInPos, " ");
			}
	}			
}

// Read position function
function readPosition() {
	var lines = arguments[0].value;
	yGetPosition = [];
	zGetPosition = [];
	
	for(var num=0; num<numg; num++) {
		yGetPosition[num] = getValueArray(lines, "YGET", num);
		zGetPosition[num] = getValueArray(lines, "ZGET", num);
	}
}

// Get value from a line inside parameter textarea
function getValue(lines, key) {
	var value = undefined;
	var line = lines.split("\n");
	var N = line.length;
	for(var i = 0; i < N; i++) {
		var col = line[i].split(" ");
		if(col[0] == key) {
			value = parseFloat(col[1]);
		}
	}
	return value;
}

// Get value from a line inside parameter textarea
function getValueArray(lines, key, num) {
	var value = undefined;
	var line = lines.split("\n");
	var N = line.length;
	for(var i = 0; i < N; i++) {
		var col = line[i].split(" ");
		if(col[0] == key) {
			value = parseFloat(col[num+1]);
		}
	}
	return value;
}

function getNumArray(lines, key) {
    var value = undefined;
	var line = lines.split("\n");
	var N = line.length;
	for(var i = 0; i < N; i++) {
		var col = line[i].split(" ");
		if(col[0] == key) {
			value = col.length
		}
	}
	return value;
}

// Do something when buttons clicked
function buttonClick() {
	// Get target and verbose to taResult
	var target = event.target;
	var cap = target.innerHTML;
	//tout(taResult, cap + "\n");
	
	// Perform according to the clicked button
	if(cap == "Load") {
		loadParameters(taInPar);
		btRead.disabled = false;
		tout(taResult, "\nd_int"
					+ ",d_bed"
					+ ",rho_int"
					+ ",rho_bed"
					+ ",freq"
					+ ",amp"
					+ ",con_i"
					+ ",zint_f"
					+ ",con_f"
					+ "\n");

		//tout(taInPos, "YGET -0.0010037484437264558 -0.16360773071106624 -0.1158280271524279 -0.0680646574985931 -0.04433863495649195 -0.04983416685538721 0.04814194838409067 0.04295700196931272 0.09084557647745371 0.13992798201390727 0.16377063397303315 -0.16371643409314993 -0.13971662578897748 -0.09194543175497352 -0.07643856402071647 -0.061748559526159146 0.0312234572334375 0.06687189644246974 0.07879105970860398 0.11603502639179492 0.15182856774736056 -0.1637103859419685 -0.1399317424960893 -0.11614447674097772 -0.05263237340294287 -0.03664200360636663 0.00955769481208121 0.05483191522471925 0.10395837561720188 0.12794177521791172 0.16370425859642337 -0.16363421776826362 -0.1399204490661475 -0.0955880936381858 -0.0738388578345465 -0.01584713329398937 0.029397005570153248 0.0708651199833471 0.09214234888990859 0.11591206669532092 0.13979395652727533 -0.1516337981163184 -0.139695056872315 -0.11612872999619404 -0.0950345084422191 -0.015944596204051923 0.00789582721737504 0.05502182816850943 0.090727289433606 0.11465263258220959 0.16352321929255773 -0.16358728425725605 -0.12766682255999395 -0.11575653787639832 -0.0818800736031513 -0.036644847956914556 0.027704804217910006 0.07483006411084424 0.10246956412804749 0.13954856264603108 0.16362357909351422 -0.139599889118136 -0.11465226179190993 -0.10264955247310682 -0.06053764481064967 -0.03664020686803695 0.038916597550924206 0.05326358343654476 0.09677188744732067 0.12642828634757683 0.14354277040326952 -0.1515447999262257 -0.12693678250829174 -0.08193353960794453 -0.06050455466267526 -0.004902848750651183 0.014955241623712633 0.051607892967266616 0.0730599728911586 0.12062917227720044 0.1636600522827496 -0.13887689185900315 -0.10298156772768678 -0.07951285290864107 -0.049608089340195595 -0.025659211804796016 -0.005809728275971162 0.0715425521177843 0.09541507336952587 0.11939826347015761 0.14243470821047943 -0.1635225339375281 -0.11488416619983018 -0.0872582021292509 -0.060040138434931396 -0.03575349522811211 0.01499043634828265 0.058819519929957945 0.0826817826895229 0.10723845818272576 0.1627381939720644\nZGET 0.03932941278081258 0.011718139916955837 0.011660266125908423 0.011544802703379604 0.011420405931937517 0.057194066058195756 0.05560993605770911 0.011822358303620403 0.01183586801290655 0.01163899625431927 0.011766180605856874 0.035474939746332965 0.011691446362599603 0.011964461418356151 0.03356146664848971 0.0779054749705431 0.0797743113301203 0.011843827201512589 0.03252885154085982 0.011506707506266213 0.03232292826472066 0.059270531588794195 0.03542091690786214 0.035359059421634205 0.03360884083208449 0.0770734368926534 0.09009315681786062 0.03259529761111617 0.031822372935702975 0.032159657879685326 0.05291712082035827 0.0831043209069228 0.05919033772095067 0.04727234145947198 0.05730349351054598 0.08901669058915952 0.10352532978572902 0.06263113046205904 0.05230454769864537 0.05256845619234487 0.05298143193705195 0.10371837595409958 0.08299868487909075 0.05922039144066758 0.07106309636355701 0.1129224465450133 0.1139501963176732 0.08037952850607663 0.07603404693031436 0.0762573571574066 0.07675907014679063 0.12441777856250835 0.10366523558530617 0.08299832177997928 0.09096403958877593 0.10093908750088901 0.12735194465157346 0.09380035226434064 0.09684556129860114 0.07690186336687836 0.10064074588163409 0.12437685343526857 0.12371595887053896 0.10296578353030343 0.1017268247513212 0.12487406671085316 0.14851432270822304 0.10423397108338264 0.12003417760997606 0.09694183370733811 0.11351559349663132 0.14511758643934344 0.144669715205734 0.11493033633520981 0.12557117692781483 0.13418177075601598 0.14758364814305305 0.12816702621854342 0.11763170518389741 0.12017677268193055 0.1263025991162079 0.16546833542265416 0.1446001171239885 0.14001878315195332 0.14685859053146574 0.14612217799420898 0.15954579288521117 0.14152688451356366 0.1439004918224701 0.14409405201124248 0.1374535383563993 0.16586300182712455 0.16540627201240143 0.16270765389253677 0.16843384055957566 0.16785721351425872 0.17154458208720322 0.16185174114842696 0.16419283303334198 0.16475980223315226 0.15024698526739072")
		nexp = 0;
	} else if(cap == "Clear") {
		clearAll();
		btRead.disabled = true;
		btStart.disabled = true;
		//tout(taResult, "All are cleared except this element\n\n");
	} else if(cap == "Read") {
		readParameters(taInPar);
		btStart.disabled = false;
		initParams();
		clearCanvas();
		drawSystem();
		tout(taResult, "\n" + diag_int_ori
					+ "," + diag_bed_ori
					+ "," + rhog_int.toFixed(2)
					+ "," + rhog_bed.toFixed(2)
					+ "," + freq.toFixed(2)
					+ "," + Amp_ori.toFixed(3) + ","
					);
	} else if(cap == "Start Simulation") {
		target.innerHTML = "Stop Simulation";
		btRead.disabled = true;
		btGetPosition.disabled = true;
		btStartVib.disabled = false;
		taInPar.disabled = true;

		proc = setInterval(simulate, tproc);
		nexp = nexp + 1;
	
	} else if(cap == "Stop Simulation") {
		target.innerHTML = "Start Simulation";
		btRead.disabled = false;
		btGetPosition.disabled = false;
		taInPar.disabled = false;
		btStartVib.innerHTML = "Start Vibration";
		btStartVib.disabled = false;
		//tout(taResult, "Simulation stops at t = " + t + "\n\n");
		clearInterval(proc);
	} else if(cap == "Stop Vibration") {
		target.innerHTML = "Start Vibration";
		vibOn = false;
		//tout(taResult, "Vibration off\n\n");
	} else if(cap == "Start Vibration") {
		target.innerHTML = "Stop Vibration";
		vibOn = true;
		//tout(taResult, "Vibration on\n\n");
	} else if(cap == "Animation OFF"){
        target.innerHTML = "Animation ON";
        show_animation = 1;
    } else if(cap == "Animation ON"){
        target.innerHTML = "Animation OFF";
        show_animation = 0;
    } else if(cap == "Show Pos") {
		taInPos.value = "";
		getPosition();
		//tout(taResult, "Get position is done\n");
	} else if(cap == "Info") {
		tout(taConsole, "oneIntrude.js -- 20190522\n"
			+ "Brazil Nut Effet on single intruder systems "
			+ "Sparisoma Viridi | "
			+ "https://github.com/dudung/butiran"
			+ "\n"
			+ "Muhammad Iqbal Rahmadhan Putra | "
			+ "miqbalrp@gmail.com"

		);
	}else if(cap == "Help"){
		alert(""
			+ "|Clear|  ->  Clear all input and output area\n"
			+ "|Load|   ->  Load default input parameters\n"
			+ "|Read|   ->  Read input parameters\n"
			+ "|Start Simulation| ->  Start simulation\n"
			+ "|Animation ON|	  ->  Show or Hide animation"
			+ "|Start Vibration|  ->  Start vibration on shaker as sine wave\n"
			+ "|Show Pos|  ->  Show current position each grain\n"
			+ "|Info|  ->  Show program description\n"
			+ "|Help|  ->  Get help\n\n"
			+ "additional : \n"
			+ " - set intruder position in range [-8,8] with INT_POS\n"
			+ " - set range of random variabel (freq, rho_int, and rho_bed)\n"
			+ " - all parameters are in SI-units"
			+ " \n\n\n"
			+ "'Dan kebahagiaan itu dapat ditemukan di sebutir pasir gurun, seperti kata Sang Alkemis. Karena sebutir pasir adalah suatu momen penciptaan, dan alam semesta telah menghabiskan waktu jutaan tahun untuk menciptakannya.'- The Alchemist, Paulo Coelho" 

		);
	}		
}

function getContactopy() {
	var Contactopy = 0;
	for (var i=1; i<numg-1; i++) {
		for (var j=i+1; j<numg; j++) {
			var deuclid = Math.sqrt(
							(r[i].y-r[j].y)*(r[i].y-r[j].y)
							+(r[i].z-r[j].z)*(r[i].z-r[j].z));
			if (deuclid < (0.5*(D[i]+D[j]))) {
				Contactopy = Contactopy + 1;
			}
		}
	}
	return Contactopy;
}

function getRise() {
	var zmax = r[1].z;
	var zmin = r[1].z;
	for (var i = 2; i < numg; i++) {
		if (zmax < r[i].z) {
			zmax = r[i].z;
		}
		if (zmin > r[i].z) {
			zmin = r[i].z;
		}
	}
	var z_int = r[0].z - zmin;
	var h_bed = zmax - zmin;
	var z_rise = z_int/h_bed;
	
	return z_rise;
}

function vect3Average() {
    var r = arguments[0];
    var N = r.length;
    var c = new Vect3;
    for (var i = 0; i < N; i++) {
        c = Vect3.add(c, r[i]);
    }
    c = Vect3.div(c, N);
    return c;
}

function centerofmass() {
	var r = arguments[0];
	var m = arguments[1];
	var gacc = arguments[2];
	var N = r.length;
	
	var sumx = 0;
	var sumy = 0;
	var sumz = 0;
	
	for(var i = 1; i<N; i=i+1) {
		sumx = sumx + r[i].x;
		sumy = sumy + r[i].y;
		sumz = sumz + r[i].z;
	}
		
	var CoMx = sumx/N;
	var CoMy = sumy/N;
	var CoMz = sumz/N;
	
	var Epot = m[i]*gacc*CoMz; 
	return CoMz;
}

// Display text in an output textarea
function tout() {
	var taOut = arguments[0];
	var msg = arguments[1];
	taOut.value += msg;
	taOut.scrollTop = taOut.scrollHeight;
}