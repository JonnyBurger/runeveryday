import {DbActivity} from './format-activity';

const overrides: Partial<DbActivity>[] = [
	{
		day: 1172,
		distance: 3440,
		city: 'Zürich',
		country: 'Switzerland'
	},
	{
		day: 1171,
		distance: 2500,
		city: 'Zürich',
		country: 'Switzerland',
		treadmill: 'Manual Treadmill'
	},
	{
		day: 1170,
		distance: 2500,
		city: 'Zürich',
		country: 'Switzerland'
	},
	{
		day: 1167,
		distance: 2500,
		city: 'Zürich',
		country: 'Switzerland'
	},
	{
		day: 1163,
		distance: 2500,
		city: 'Zürich',
		country: 'Switzerland',
		treadmill: 'Treadmill'
	},
	{
		day: 1168,
		injured:
			'Felt some significant pain in my lower back which just suddenly appeared when I stood up earlier this day'
	},
	{
		day: 565,
		injured:
			'The night before I twisted my ankle after going out while chasing an Uber and stepping into a pothole. I was limping this 2.5km!'
	},
	{
		day: 688,
		distance: 2500
	},
	{
		day: 1139,
		distance: 2600
	},
	...[658, 659, 660, 661].map(day => ({
		day,
		city: 'Sofia'
	})),
	...[664, 665, 666, 667, 668, 669, 670, 671, 672].map(day => ({
		day,
		sick:
			"During these days I had fever and was laying in bed all day. But I did not wanna give up and went out running (often while it was snowing). Don't do this!"
	})),
	...[
		1163,
		1161,
		1156,
		1155,
		1153,
		1151,
		1150,
		1149,
		1148,
		1147,
		1138,
		1135,
		1133,
		1132,
		1131,
		1127,
		1126,
		1124,
		1123,
		1122,
		1121,
		1113,
		1112,
		1111,
		1110,
		1107,
		1104,
		1103,
		1102,
		1101,
		1100,
		1099,
		1096,
		1095,
		1094,
		1092,
		1089,
		1088,
		1087,
		1086,
		1085,
		1084,
		1083,
		1082,
		1081,
		1080,
		1079,
		1075,
		1074,
		1073,
		1072,
		1071,
		1070,
		1069,
		1068,
		1064,
		1061,
		1060,
		1058,
		1056,
		1053,
		1051,
		1040,
		1036,
		1033,
		1026,
		1022,
		1020,
		1019,
		1016,
		1014,
		1013,
		1008,
		988,
		970,
		966,
		959,
		955,
		951,
		946,
		938,
		887,
		871,
		868,
		866,
		860,
		852,
		845,
		844,
		842,
		841,
		840,
		836,
		835,
		833,
		830,
		828,
		825,
		824,
		820,
		819,
		818,
		817,
		816,
		815,
		811,
		810,
		809,
		808,
		807,
		806,
		805,
		804,
		802,
		794,
		792,
		787,
		785,
		783,
		782,
		781,
		776,
		775,
		769,
		768,
		761,
		758,
		756,
		751,
		749,
		744,
		741,
		740,
		739,
		724,
		719,
		716,
		714,
		712,
		710,
		706,
		703,
		700,
		693,
		691,
		690,
		687,
		685,
		672,
		670,
		669,
		665,
		657,
		654,
		650,
		647,
		639,
		637,
		636,
		633,
		617,
		615,
		609,
		608,
		606,
		601,
		592,
		590,
		587,
		579,
		573,
		572,
		571,
		569,
		567,
		554,
		553,
		552,
		543,
		538,
		532,
		531,
		529,
		511,
		507,
		506,
		504,
		503,
		502,
		484,
		483,
		482,
		481,
		480,
		477,
		475
	].map(day => ({
		day,
		distance: 2500,
		city: 'Zürich',
		country: 'Switzerland',
		treadmill: 'Treadmill'
	})),
	...[919, 915, 914, 913, 912, 911, 910].map(day => ({
		day,
		distance: 2500,
		city: 'Los Angeles',
		country: 'United States',
		treadmill: 'Bunker Hill Towers Gym Treadmil'
	})),
	...[
		928,
		927,
		926,
		925,
		924,
		923,
		922,
		921,
		920,
		919,
		918,
		917,
		916,
		909,
		908,
		907,
		906,
		905,
		904,
		903,
		902,
		901
	].map(day => ({
		day,
		city: 'Los Angeles'
	})),
	...[170, 730].map(day => ({
		day,
		city: 'Milan'
	})),
	...[964, 963, 962, 961, 960].map(day => ({
		day,
		city: 'Sofia'
	})),
	{
		day: 1160,
		drunk:
			'Forgot all my running stuff and went to a football game afterwards where I drank some beers'
	},
	{
		day: 170,
		drunk:
			'Was going out in Milan and went for a run for the next day when I came home!'
	},
	{
		day: 855,
		drunk: 'Open Air Southside'
	},
	{
		day: 856,
		drunk: 'Open Air Southside'
	},
	{
		day: 857,
		drunk: 'Open Air Southside'
	},
	{
		day: 862,
		drunk: 'Open Air St. Gallen'
	},
	{
		day: 863,
		drunk: 'Open Air St. Gallen'
	},
	{
		day: 500,
		drunk:
			'I was still totally lit from Open Air St. Gallen when I ran almost at midnight. Probably the drunkest run I ever done'
	}
];

export default overrides;