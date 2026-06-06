<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $phone   = htmlspecialchars($_POST['phone']);
    $service = htmlspecialchars($_POST['service']);
    $message = htmlspecialchars($_POST['message']);

    $to = "info@chronicleventures.com"; // Admin Email
    $subject = "New Contact Form Submission";

    $body = "
    Name: $name

    Email: $email

    Phone: $phone

    Message:
    $message
    ";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if(mail($to, $subject, $body, $headers)){
        echo "<script>
                alert('Message sent successfully!');
                window.location.href='index.html';
              </script>";
    } else {
        echo "<script>
                alert('Something went wrong!');
                history.back();
              </script>";
    }
}
?>