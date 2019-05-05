export interface SummarySegmentEffort {
	id: number;
	elapsed_time: number;
	start_date: Date;
	start_date_local: Date;
	distance: number;
	is_kom: boolean;
}

export interface SummarySegment {
	id: number;
	name: string;
	activity_type: ActivityType;
	distance: number;
	average_grade: number;
	maximum_grade: number;
	elevation_high: number;
	elevation_low: number;
	start_latlng: number[];
	end_latlng: number[];
	climb_category: number;
	city: string;
	state: string;
	country: string;
	private: boolean;
	athlete_pr_effort: SummarySegmentEffort;
}

export interface DetailedSegmentEffort {
	id: number;
	elapsed_time: number;
	start_date: Date;
	start_date_local: Date;
	distance: number;
	is_kom: boolean;
	name: string;
	activity: MetaActivity;
	athlete: MetaAthlete;
	moving_time: number;
	start_index: number;
	end_index: number;
	average_cadence: number;
	average_watts: number;
	device_watts: boolean;
	average_heartrate: number;
	max_heartrate: number;
	segment: SummarySegment;
	kom_rank: number;
	pr_rank: number;
	hidden: boolean;
}

export interface MetaActivity {
	id: number;
}

export interface Lap {
	id: number;
	activity: MetaActivity;
	athlete: MetaAthlete;
	average_cadence: number;
	average_speed: number;
	distance: number;
	elapsed_time: number;
	start_index: number;
	end_index: number;
	lap_index: number;
	max_speed: number;
	moving_time: number;
	name: string;
	pace_zone: number;
	split: number;
	start_date: Date;
	start_date_local: Date;
	total_elevation_gain: number;
}

export interface PhotoSummary_primary {
	id: number;
	source: number;
	unique_id: string;
	urls: string;
}

export interface PhotoSummary {
	count: number;
	primary: PhotoSummary_primary;
}

export interface PolylineMap {
	id: string;
	polyline: string;
	summary_polyline: string;
}

export interface PhotoSummary_primary {
	id: number;
	source: number;
	unique_id: string;
	urls: string;
}

export interface PhotoSummary {
	count: number;
	primary: PhotoSummary_primary;
}

export interface MetaAthlete {
	id: number;
}

export enum ResourceState {
	Meta = 1,
	Summary = 2,
	Detail = 3
}

export interface SummaryGear {
	id: string;
	resource_state: ResourceState;
	primary: boolean;
	name: string;
	distance: number;
}

export interface Split {
	average_speed: number;
	distance: number;
	elapsed_time: number;
	elevation_difference: number;
	pace_zone: number;
	moving_time: number;
	split: number;
}

export enum ActivityType {
	AlpineSki = 'AlpineSki',
	BackcountrySki = 'BackcountrySki',
	Canoeing = 'Canoeing',
	Crossfit = 'Crossfit',
	EBikeRide = 'EBikeRide',
	Elliptical = 'Elliptical',
	Hike = 'Hike',
	IceSkate = 'IceSkate',
	InlineSkate = 'InlineSkate',
	Kayaking = 'Kayaking',
	Kitesurf = 'Kitesurf',
	NordicSki = 'NordicSki',
	Ride = 'Ride',
	RockClimbing = 'RockClimbing',
	RollerSki = 'RollerSki',
	Rowing = 'Rowing',
	Run = 'Run',
	Snowboard = 'Snowboard',
	Snowshoe = 'Snowshoe',
	StairStepper = 'StairStepper',
	StandUpPaddling = 'StandUpPaddling',
	Surfing = 'Surfing',
	Swim = 'Swim',
	VirtualRide = 'VirtualRide',
	Walk = 'Walk',
	WeightTraining = 'WeightTraining',
	Windsurf = 'Windsurf',
	Workout = 'Workout',
	Yoga = 'Yoga'
}

export interface DetailedActivity {
	id: number;
	external_id: string;
	upload_id: number;
	athlete: MetaAthlete;
	name: string;
	distance: number;
	moving_time: number;
	elapsed_time: number;
	total_elevation_gain: number;
	elev_high: number;
	elev_low: number;
	type: ActivityType;
	start_date: Date;
	start_date_local: Date;
	timezone: string;
	start_latlng: number[];
	end_latlng: number[];
	achievement_count: number;
	kudos_count: number;
	comment_count: number;
	athlete_count: number;
	photo_count: number;
	total_photo_count: number;
	map: PolylineMap;
	trainer: boolean;
	commute: boolean;
	manual: boolean;
	private: boolean;
	flagged: boolean;
	workout_type: number;
	average_speed: number;
	max_speed: number;
	has_kudoed: boolean;
	description: string;
	photos: PhotoSummary;
	gear: SummaryGear;
	calories: number;
	segment_efforts: DetailedSegmentEffort[];
	device_name: string;
	embed_token: string;
	splits_metric: Split;
	splits_standard: Split;
	laps: Lap[];
	best_efforts: DetailedSegmentEffort[];
}
