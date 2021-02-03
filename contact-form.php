<?php
function clean_string($string)
{
    $bad = array("content-type", "bcc:", "to:", "cc:", "href");
    return str_replace($bad, "", $string);
}
    if (isset($_POST['Email']) && isset($_POST['Name'])){
    
        // EDIT THE 2 LINES BELOW AS REQUIRED
        $email_to = "trakadev@gmail.com";
        $email_subject = "Contacto ".$_POST['Name'];        
        $name = $_POST['Name']; // required
        $email = $_POST['Email']; // required
        $message = $_POST['Message']; // required
    
        $error_message = "";
        $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    
        if (!preg_match($email_exp, $email)) {
            echo json_encode(['Error', 'Email Invalido.']);
        }else{      
    
            $email_message = "Form details below.\n\n";        
            $email_message .= "Name: " . clean_string($name) . "\n";
            $email_message .= "Email: " . clean_string($email) . "\n";
            $email_message .= "Message: " . clean_string($message) . "\n";
    
            // create email headers
            $headers = 'From: ' . "contacto@jorgeluisjaimesanchez.com" . "\r\n" .
                'Reply-To: ' . $email . "\r\n" .
                'X-Mailer: PHP/' . phpversion();
            mail($email_to, $email_subject, $email_message, $headers);
            echo json_encode(["SUCESS"=>"MENSAJE ENVIADO"]);
        }    
    }else{
        echo json_encode(["ERROR"=>"REQUEST VACIA"]);
    }
?>