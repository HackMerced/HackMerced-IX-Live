/* Reward confirmation. */
$(document).on("click", ".claim", function()
{
	let tr = $(this).parent().parent();
	let id = tr[0].id;
	let prize = tr.find(".reward-contents").text();
	let value = tr.find(".reward-value").text();

	if (!confirm("Are you sure you want to redeem "+prize+" for "+value+" points?"))  return;

	$.ajax(
	{
		type: "POST",
		url: "/api/reward/redeem/"+id,
		data: {"name": $("#entry-name").val()},
		success: function()
		{
			refresh();
		},
		error: function()
		{
			alert("Claim failed. Out of stock, already claimed, or insufficient points.");
		}
	});

	return false;
});

$("#profile-edit-form").submit(function()
{
	$.ajax(
	{
		type: "POST",
		url: "/api/user/edit/profile",
		data: {
			"name"   : $("#fname").val(),
			"surname": $("#lname").val(),
			"email"  : $("#email").val(),
			"phone"  : $("#phone").val(),
			"school" : $("#school").val(),
			"major"  : $("#major").val(),
		},
		success: function()
		{
			refresh();
			$("#profile-edit-submit").val("Updated!");
			setTimeout(reset_profile_edit_button, 5000);
		},
		error: function()
		{
			refresh();
			$("#profile-edit-submit").val("Error. Try again.");
			setTimeout(reset_profile_edit_button, 5000);
		}
	});

	return false;
});

function reset_profile_edit_button()
{
	$("#profile-edit-submit").val("Update Profile");
}
