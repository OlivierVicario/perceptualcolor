"use strict";

var X_D65 = 0.950467;
var Y_D65 = 1.0000;
var Z_D65 = 1.088969;
var CIE_EPSILON = 0.008856;
var CIE_KAPPA = 903.3;
var CIE_KAPPA_EPSILON = CIE_EPSILON * CIE_KAPPA;

var b = 1.15;
var g = 0.66;
var c1 = 3424 / Math.pow(2, 12);
var c2 = 2413 / Math.pow(2, 7);
var c3 = 2392 / Math.pow(2, 7);
var n = 2610 / Math.pow(2, 14);
var p = 1.7 * 2523 / Math.pow(2, 5);
var d = -0.56;
var d0 = 1.6295499532821566 * Math.pow(10, -11);

function xyzToRGB(xyz) {
    var x = xyz[0];
    var y = xyz[1];
    var z = xyz[2];

    var r_linear = +3.2406 * x - 1.5372 * y - 0.4986 * z;
    var g_linear = -0.9689 * x + 1.8758 * y + 0.0415 * z;
    var b_linear = +0.0557 * x - 0.2040 * y + 1.0570 * z;

    var r = r_linear > 0.0031308
        ? 1.055 * Math.pow(r_linear, (1 / 2.4)) - 0.055
        : 12.92 * r_linear;

    var g = g_linear > 0.0031308
        ? 1.055 * Math.pow(g_linear, (1 / 2.4)) - 0.055
        : 12.92 * g_linear;

    var b = b_linear > 0.0031308
        ? 1.055 * Math.pow(b_linear, (1 / 2.4)) - 0.055
        : 12.92 * b_linear;

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function labToXYZ(lab) {

    var l = lab[0];
    var a = lab[1];
    var b = lab[2];

    if (l > CIE_KAPPA_EPSILON) {
        var yr = Math.pow((l + 16) / 116, 3);
    } else {
        var yr = l / CIE_KAPPA;
    }

    if (yr > CIE_EPSILON) {
        var fy = (l + 16) / 116.0;
    } else {
        var fy = (CIE_KAPPA * yr + 16) / 116.0;
    }

    var fx = a / 500 + fy;
    var fx3 = fx * fx * fx;

    if (fx3 > CIE_EPSILON) {
        xr = fx3;
    } else {
        xr = (116 * fx - 16) / CIE_KAPPA;
    }


    var fz = fy - b / 200.0;
    var fz3 = fz * fz * fz;

    if (fz3 > CIE_EPSILON) {
        zr = fz3;
    } else {
        zr = (116 * fz - 16) / CIE_KAPPA;
    }


    return [(xr * X_D65), (yr * Y_D65), (zr * Z_D65)];
}

function rgbToXYZ(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;

    var r_linear = r > 0.04045
        ? Math.pow((r + 0.055) / 1.055, 2.4)
        : r / 12.92;

    var g_linear = g > 0.04045
        ? Math.pow((g + 0.055) / 1.055, 2.4)
        : g / 12.92;

    var b_linear = b > 0.04045
        ? Math.pow((b + 0.055) / 1.055, 2.4)
        : b / 12.92;

    var x = 0.4124 * r_linear + 0.3576 * g_linear + 0.1805 * b_linear;
    var y = 0.2126 * r_linear + 0.7152 * g_linear + 0.0722 * b_linear;
    var z = 0.0193 * r_linear + 0.1192 * g_linear + 0.9505 * b_linear;

    return [x, y, z];
}

function xyzToLAB(xyz) {
    var xr = xyz[0] / X_D65;
    var yr = xyz[1] / Y_D65;
    var zr = xyz[2] / Z_D65;

    var fx = xr > CIE_EPSILON
        ? Math.pow(xr, 1.0 / 3.0)
        : (CIE_KAPPA * xr + 16) / 116.0;

    var fy = yr > CIE_EPSILON
        ? Math.pow(yr, 1.0 / 3.0)
        : (CIE_KAPPA * yr + 16) / 116.0;

    var fz = zr > CIE_EPSILON
        ? Math.pow(zr, 1.0 / 3.0)
        : (CIE_KAPPA * zr + 16) / 116.0;

    return [(116 * fy - 16), (500 * (fx - fy)), (200 * (fy - fz))];
}

//CIE-L*ab —> CIE-L*CH°
function labToLCH(lab) {
    var var_H = Math.atan2(lab[2], lab[1]); //Quadrant by signs
    if (var_H > 0) {
        var_H = (var_H / Math.PI) * 180;
    } else {
        var_H = 360 - (Math.abs(var_H) / Math.PI) * 180;
    }
    var l = lab[0];
    var c = Math.sqrt(Math.pow(lab[1], 2) + Math.pow(lab[2], 2));
    var h = var_H;

    return [l, c, h];
}

//CIE-L*CH° —>CIE-L*ab//CIE-H° from 0 to 360°
function lchToLAB(lch) {
    var l = lch[0];
    var a = Math.cos((lch[2] * Math.PI / 180.0)) * lch[1];
    var b = Math.sin((lch[2] * Math.PI / 180.0)) * lch[1];
    return [l, a, b];
}

function rgbToLAB(rgb) {
    return (xyzToLAB(rgbToXYZ(rgb)));
}

function labToRGB(lab) {
    return (xyzToRGB(labToXYZ(lab)));
}

function rgbToLCH(rgb) {
    return (labTolCH(rgbToLAB(rgb)));
}

function lchToRGB(lch) {
    return (labToRGB(lchToLAB(lch)));
}

function XYZtoJab(XYZ) {
    var XYZp = [];
    XYZp[0] = b * XYZ[0] - ((b - 1) * XYZ[2]);
    XYZp[1] = g * XYZ[1] - ((g - 1) * XYZ[0]);
    XYZp[2] = XYZ[2];

    var LMS = [];
    LMS[0] = 0.41478972 * XYZp[0] + 0.579999 * XYZp[1] + 0.0146480 * XYZp[2];
    LMS[1] = -0.2015100 * XYZp[0] + 1.120649 * XYZp[1] + 0.0531008 * XYZp[2];
    LMS[2] = -0.0166008 * XYZp[0] + 0.264800 * XYZp[1] + 0.6684799 * XYZp[2];

    var LMSp = [];
    for (var i = 0; i < 3; i++) {
        LMSp[i] = Math.pow((c1 + c2 * Math.pow((LMS[i] / 10000), n)) / (1 + c3 * Math.pow((LMS[i] / 10000), n)), p);
    }

    var Iab = [];
    Iab[0] = 0.5 * LMSp[0] + 0.5 * LMSp[1];
    Iab[1] = 3.524000 * LMSp[0] - 4.066708 * LMSp[1] + 0.542708 * LMSp[2];
    Iab[2] = 0.199076 * LMSp[0] + 1.096799 * LMSp[1] - 1.295875 * LMSp[2];

    var Jab = [];
    Jab[0] = ((1 + d) * Iab[0] / (1 + d * Iab[0])) - d0;
    Jab[1] = Iab[1];
    Jab[2] = Iab[2];

    return Jab;
}

function JabtoXYZ(Jab) {

    var Iab = [];
    Iab[0] = (Jab[0] + d0) / (1 + d - d * (Jab[0] + d0));
    Iab[1] = Jab[1];
    Iab[2] = Jab[2];

    var LMSp = [];
    LMSp[0] = 1.0 * Iab[0] + 0.138605 * Iab[1] + 0.058047 * Iab[2];
    LMSp[1] = 1.0 * Iab[0] - 0.138605 * Iab[1] - 0.058047 * Iab[2];
    LMSp[2] = 1.0 * Iab[0] - 0.096019 * Iab[1] - 0.811892 * Iab[2];

    var LMS = [];
    for (var i = 0; i < 3; i++) {
        LMS[i] = 10000 * Math.pow((c1 - Math.pow(LMSp[i], 1 / p)) / ((c3 * Math.pow(LMSp[i], 1 / p)) - c2), 1 / n);
    }

    var XYZp = [];
    XYZp[0] = 1.924226 * LMS[0] - 1.004792 * LMS[1] + 0.037651 * LMS[2];
    XYZp[1] = 0.350317 * LMS[0] + 0.726481 * LMS[1] - 0.065384 * LMS[2];
    XYZp[2] = -0.090983 * LMS[0] - 0.312728 * LMS[1] + 1.522766 * LMS[2];

    var XYZ = [];
    XYZ[0] = (XYZp[0] + (b - 1) * XYZp[2]) / b;
    XYZ[1] = (XYZp[1] + (g - 1) * XYZ[0]) / g;//corrigé
    XYZ[2] = XYZp[2];

    return XYZ;
}