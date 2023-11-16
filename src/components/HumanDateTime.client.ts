//
// Imports
//

import { DateTime } from "luxon";

//
// Component
//

(async () =>
{
	const updateTimeElements = () =>
	{
		const timeElements = Array.from(document.querySelectorAll("time.component-human-date-time")) as HTMLTimeElement[];

		for (const timeElement of timeElements)
		{
			const convertToLocalTime = timeElement.dataset["convertToLocalTime"] === "true";
			const showDate = timeElement.dataset["showDate"] === "true";
			const showTime = timeElement.dataset["showTime"] === "true";
			const showRelativeTime = timeElement.dataset["showRelativeTime"] === "true";

			if (convertToLocalTime && showDate)
			{
				const dateTimeElement = timeElement.querySelector(".date-time") as HTMLElement;

				const format = showTime ? DateTime.DATETIME_MED : DateTime.DATE_MED;

				dateTimeElement.innerText = DateTime.fromISO(timeElement.dateTime).toLocaleString(format);
			}

			if (showRelativeTime)
			{
				const relativeTimeElement = timeElement.querySelector(".relative-time") as HTMLElement;

				const relativeTime = DateTime.fromISO(timeElement.dateTime).toRelative();

				let text = "";
				text += showDate ? "(" : "";
				text += relativeTime;
				text += showDate ? ")" : "";

				if (relativeTimeElement.innerText !== text)
				{
					relativeTimeElement.innerText = text;
				}
			}
		}
	};

	updateTimeElements();

	setInterval(() => updateTimeElements(), 1000);
})();