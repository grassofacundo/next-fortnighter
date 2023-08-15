interface jobPosition {
	id: string;
	name: string;
	//isSelected: boolean;
}

interface shift {
	date: Date;
	timeWorked: number;
	isSaturday: boolean;
	isSunday: boolean;
	isHoliday: boolean;
	hoursWorked: { from: number; to: number };
}
