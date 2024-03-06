let lastUpdateEvents = null;

/* Update the day counter. */
const FRIDAY = 1709884800;
const SATURDAY = 1709971200;
const SUNDAY = 1710057600;
const MONDAY = 1710140400;

/* Load events from /api/event/list into #event-table. */
function load_events()
{
	let now = Date.now()/1000;

	if ((now >= FRIDAY) && (now < SATURDAY))
	{
		$("#day-friday").addClass("today");
		$("#day-saturday").removeClass("today");
		$("#day-sunday").removeClass("today");
	}
	else if ((now >= SATURDAY) && (now < SUNDAY))
	{
		$("#day-friday").removeClass("today");
		$("#day-saturday").addClass("today");
		$("#day-sunday").removeClass("today");
	}
	else if ((now >= SUNDAY) && (now < MONDAY))
	{
		$("#day-friday").removeClass("today");
		$("#day-saturday").removeClass("today");
		$("#day-sunday").addClass("today");
	}
	else
	{
		$("#day-friday").removeClass("today");
		$("#day-saturday").removeClass("today");
		$("#day-sunday").removeClass("today");
	}

	$.getJSON("/api/event/list", function (d)
	{
		let dataStr = JSON.stringify(d.Events);

		if (lastUpdateEvents != dataStr)
		{
			lastUpdateEvents = dataStr;

			$("#event-table").empty();

			let str = "<tr><th colspan=3>Event Showings</th></tr>"
			$("#event-table").append(str);

			for (let i = d.Events.length-1; i >= 0; i--)
			{
				/* Hide past events. */
				if (d.Events[i].status == 2)  continue;

				let currentClass = "";
				if (d.Events[i].status == 1)  currentClass = " event-current";

				str =
					"<tr class='table-spacer'></tr>"+
					"<tr class='table-content"+currentClass+"'>"+
						"<td class='map'><img src='"+d.Events[i].weblink+"'/></td>"+
						"<td class='info'>"+
							"<p><b>"+d.Events[i].title+"</b> by "+d.Events[i].author+"</p>"+
							"<p>in "+d.Events[i].location+"</p>"+
							"<p>"+d.Events[i].points+" points</p>"+
						"</td>"+
						"<td class='description'>"+
							"<p>"+d.Events[i].description+"</p><br>"+
							"<p>"+
								"<span class='time'>"+d.Events[i].dDay+"</span>"+
								"<span class='time'>"+d.Events[i].dTime+"</span>"+
								"<span class='time'>"+d.Events[i].dDuration+"</span>"+
							"</p>"+
						"</td>"+
					"</tr>";

				$("#event-table").append(str);
			}
		}
	});
}
