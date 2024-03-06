/* Reward confirmation. */
$(document).on("click", ".claim", function()
{
	if ($(this).hasClass("claimed") || $(this).hasClass("retrieved"))  return false;

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

/* Edit user info. */
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

/* Change your password. */
$("#profile-password-form").submit(function()
{
	$.ajax(
	{
		type: "POST",
		url: "/api/user/edit/password",
		data: {
			"oldPass" : $("#oldPass").val(),
			"password": $("#password").val(),
			"confirm" : $("#confirm").val(),
		},
		success: function()
		{
			refresh();
			$("#oldPass").val("");
			$("#password").val("");
			$("#confirm").val("");
			$("#profile-password-submit").val("Updated!");
			setTimeout(reset_profile_password_button, 5000);
		},
		error: function()
		{
			refresh();
			$("#profile-password-submit").val("Error. Try again.");
			setTimeout(reset_profile_password_button, 5000);
		}
	});

	return false;
});

function reset_profile_password_button()
{
	$("#profile-password-submit").val("Update Password");
}

/* Voucher code form. */
$("#profile-code-form").submit(function()
{
	$.ajax(
	{
		type: "POST",
		url: "/api/code/submit/"+$("#code").val(),
		success: function()
		{
			refresh();
			$("#code").val("");
			$("#profile-code-submit").val("Redeemed!");
			setTimeout(reset_profile_code_button, 5000);
		},
		error: function()
		{
			refresh();
			$("#profile-code-submit").val("Error. Try again.");
			setTimeout(reset_profile_code_button, 5000);
		}
	});

	return false;
});

function reset_profile_code_button()
{
	$("#profile-code-submit").val("Submit");
}
