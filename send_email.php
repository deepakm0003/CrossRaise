<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Gather input data from the form
    $name = $_POST['name'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    $telegram = $_POST['telegram'];
    $linkedin = $_POST['linkedin'];
    $message = $_POST['message'];
    $types = implode(", ", $_POST['type']); // Convert checkbox array to comma-separated string
    
    // Compose email message
    $to = "crossraise2024@gmail.com";
    $subject = "New Contact Form Submission from CrossRaise Website";
    $body = "Name: $name\n";
    $body .= "Company: $company\n";
    $body .= "Email: $email\n";
    $body .= "Telegram: $telegram\n";
    $body .= "LinkedIn: $linkedin\n";
    $body .= "Type: $types\n";
    $body .= "Message:\n$message\n";
    
    // Send email
    $headers = "From: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Message sent successfully! We will get back to you shortly.'); window.location = 'contact.html';</script>";
    } else {
        echo "<script>alert('Message could not be sent. Please try again later.'); window.location = 'contact.html';</script>";
    }
} else {
    // Handle if someone tries to access the script directly
    header("Location: contact.html");
    exit();
}
?>
