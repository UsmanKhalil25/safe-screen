export type FileRecord = {
	id: string;
	fileName: string;
	mimeType: string;
	sizeBytes: number;
	status: "active" | "deleted";
	createdAt: Date;
};

export const files: FileRecord[] = [
	{
		id: "file_9f2c1a",
		fileName: "jordan-lee-resume.pdf",
		mimeType: "application/pdf",
		sizeBytes: 214_532,
		status: "active",
		createdAt: new Date("2026-08-05T14:32:00Z"),
	},
	{
		id: "file_7b81de",
		fileName: "background-check-report.pdf",
		mimeType: "application/pdf",
		sizeBytes: 1_284_301,
		status: "active",
		createdAt: new Date("2026-08-04T09:15:00Z"),
	},
	{
		id: "file_3ac220",
		fileName: "drivers-license-front.jpg",
		mimeType: "image/jpeg",
		sizeBytes: 843_120,
		status: "active",
		createdAt: new Date("2026-08-03T18:02:00Z"),
	},
	{
		id: "file_c04e91",
		fileName: "drivers-license-back.jpg",
		mimeType: "image/jpeg",
		sizeBytes: 801_442,
		status: "active",
		createdAt: new Date("2026-08-03T18:02:00Z"),
	},
	{
		id: "file_15fa77",
		fileName: "employment-history.xlsx",
		mimeType:
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		sizeBytes: 58_204,
		status: "active",
		createdAt: new Date("2026-08-02T11:47:00Z"),
	},
	{
		id: "file_8e2b3d",
		fileName: "reference-letters.zip",
		mimeType: "application/zip",
		sizeBytes: 4_512_003,
		status: "active",
		createdAt: new Date("2026-07-30T16:20:00Z"),
	},
	{
		id: "file_a01f56",
		fileName: "candidate-photo.png",
		mimeType: "image/png",
		sizeBytes: 1_930_112,
		status: "deleted",
		createdAt: new Date("2026-07-28T08:55:00Z"),
	},
	{
		id: "file_6dd440",
		fileName: "signed-consent-form.pdf",
		mimeType: "application/pdf",
		sizeBytes: 128_774,
		status: "active",
		createdAt: new Date("2026-07-26T13:10:00Z"),
	},
	{
		id: "file_2199ab",
		fileName: "credit-report-summary.csv",
		mimeType: "text/csv",
		sizeBytes: 12_884,
		status: "active",
		createdAt: new Date("2026-07-22T10:05:00Z"),
	},
	{
		id: "file_e77c02",
		fileName: "old-application-draft.pdf",
		mimeType: "application/pdf",
		sizeBytes: 96_310,
		status: "deleted",
		createdAt: new Date("2026-07-18T19:44:00Z"),
	},
];
