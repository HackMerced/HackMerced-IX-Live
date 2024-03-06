let lastUpdateInfo = null;

function update_rewards(rewards)
{
	$("#prizes-content").empty();
	$("#prizes-content").append(
		"<tr>"+
			"<th>Prize</th>"+
			"<th>Description</th>"+
			"<th>Cost</th>"+
			"<th>Qty</th>"+
			"<th style='min-width: 10em'></th>"+
		"</tr>"
	);

	for (let i = 0; i < rewards.length; i++)
	{
		let str = "<tr id='"+rewards[i].id+"'>"+
			"<td class='reward-contents'>"+rewards[i].reward+"</td>"+
			"<td>"+rewards[i].text+"</td>"+
			"<td class='reward-value'>"+rewards[i].value+"</td>"+
			"<td>"+rewards[i].stock+"/"+rewards[i].total+"</td>";

		if (rewards[i].status == 2)
			str += "<td><button class='claim retrieved'>Retrieved</button></td>";
		else if (rewards[i].status == 1)
			str += "<td><button class='claim claimed'>Claimed</button></td>";
		else
			str += "<td><button class='claim'>Claim</button></td>";

		str += "</tr>";

		$("#prizes-content").append(str);
	}
}

function update_stamps(stamps)
{
	$("#punches").empty();

	for (let i = 0; i < stamps.length; i++)
	{
		let str = "<tr><td>"+stamps[i].name+"</td>";

		for (let j = 0; j < stamps[i].slots; j++)
		{
			if (j < stamps[i].punches)
				str += "<td><div class='punch true'></div></td>";
			else
				str += "<td><div class='punch false'></div></td>";
		}

		str += "</tr>";

		$("#punches").append(str);
	}
}

function update_user_info()
{
	$.getJSON("/api/user/info", function (data)
	{
		let dataStr = JSON.stringify(data.User);

		if (lastUpdateInfo != dataStr)
		{
			lastUpdateInfo = dataStr;

			$("#points").text(data.User.points);
			$("#profile-points").text(data.User.points);

			update_stamps(data.User.stamps);
			update_rewards(data.User.rewards);

			$("#badge-breakdown").empty();

			for (let i = 0; i < data.User.breakdown.length; i++)
			{
				$("#badge-breakdown").append("<li>"+data.User.breakdown[i]+"</li>");
			}
		}
	});
}

/* Continuously update the page via AJAX. */
function refresh()
{
	update_user_info();
	load_announcementsl();
	load_events(false);
}
function refresh_loop()
{
	refresh();
	setTimeout(refresh_loop, 5000);
}
