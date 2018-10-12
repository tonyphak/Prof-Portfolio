<?php

// Place reciepents and email sender here
$recipient = "youremail@here.com";
$sender = "noreply@ipgroups.net";

$errors = array();

if( isset( $_POST['name'] ) && !empty( $_POST['name'] ) ) {
	$name = $_POST['name'];
} else {
	$errors[] = 'Name empty';
}

if( isset( $_POST['email'] ) && !empty( $_POST['email'] ) ) {
	if( !filter_var( $_POST['email'], FILTER_VALIDATE_EMAIL ) ) {
		$errors[] = 'Invalid email format'; 
	} else {
		$email = $_POST['email'];
	}
} else {
	$errors[] = 'Email empty';
}

if( isset( $_POST['subject'] ) && !empty( $_POST['subject'] ) ) {
	$subject = $_POST['subject'];
} else {
	$errors[] = 'Subject empty';
}

if( isset( $_POST['message'] ) && !empty( $_POST['message'] ) ) {
	$message = $_POST['message'];
} else {
	$errors[] = 'Message empty';
}

header('Content-Type: application/json');

if( empty( $errors ) ) {
	$content = "From: $name\nEmail: $email\nMessage: $message";
	$mailheader = "From: $sender \r\n";
	$mailheader .= "Reply-to: $email \r\n";
	$success = mail( $recipient, $subject, $content, $mailheader );
	if( $success ) {
		echo json_encode( array(
			'success' => true,
			'message' => 'Email sent',
		) );
	} else {
		echo json_encode( array(
			'success' => false,
			'message' => 'Something went wrong',
		) );
	}
} else {
	echo json_encode( array(
		'success' => false,
		'message' => implode( '<br>', $errors ),
	) );
}
