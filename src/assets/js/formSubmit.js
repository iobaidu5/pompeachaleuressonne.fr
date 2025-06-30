jQuery(document).ready(function ($) {
  var successMessage = `<i class="fa fa-info-circle"></i><b class="success-message">Succès:</b> Votre demande est envoyée avec succès`;
  var ErrorMessage = `<i class="fa fa-info-circle"></i><b class="error-message">Erreur:</b> Veuillez vérifier vos données d'entrée`;
  // var checkbox = document.querySelector('input[name="condition"]');
  // var checkboxError = document.getElementById('checkboxError');

  $("#contactForm").on("submit", function (e) {
    sendFormData(e, "#contactForm", "contact");
  });

  $("#devisForm").on("submit", function (e) {
    sendFormData(e, "#devisForm", "devis");
  });

  function sendFormData(e, id, type) {
    e.preventDefault();
    if (grecaptcha.getResponse().length == 0) {
      alert("Veuillez vérifier le reCAPTCHA");
      return false;
    }

  //   if (!checkbox.checked) {
  //     checkboxError.textContent = "Le formulaire n'est pas envoyé tant que vous n'acceptez pas ce point";
  //     e.preventDefault(); 
  // } else {
  //     checkboxError.textContent = ''; 
  // }

    $.ajax({
      url: $(id)[0]["action"],
      type: "POST",
      data: $(id).serialize(),
      datatype: "json",
      success: function (data, response, message) {
        if (type === "contact") {
          e.target
            .querySelector("#contact-form-response")
          e.target.querySelector(
            "#contact-form-response"
          )
            window.location.href="/message-envoye";
        }
        if (type === "devis"){
        e.target.querySelector("#devis-form-response").classList.add("success");
        e.target.querySelector(
          "#devis-form-response"
        ).innerHTML = successMessage;
        }
        window.location.href="/message-envoye";  
        localStorage.removeItem('calc_list');
                localStorage.removeItem('calc_volume');
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (type === "contact") {
          e.target.querySelector("#contact-form-response").classList.add("error");
          e.target.querySelector(
            "#contact-form-response"
          ).innerHTML = ErrorMessage;
        }
        if (type === "devis") {
          e.target.querySelector("#devis-form-response").classList.add("error");
          e.target.querySelector(
            "#devis-form-response"
          ).innerHTML = ErrorMessage;
          console.log(textStatus);
        }
      },
    });
  }
  // $("#clone_g_re_captcha").html($("#g_re_captcha").clone(true, true));
  $("#contact-form").prop("disabled", true);
});

var CaptchaCallback = function () {
  jQuery(".g-recaptcha").each(function () {
    grecaptcha.render(this, {
      sitekey: "6Lca_0grAAAAADLoA4mDt-EgpGlYYCJudznM_kSU",
      callback: correctCaptcha,
    });
  });
};

function correctCaptcha() {
  if (grecaptcha === undefined) {
    return;
  }
  console.log(grecaptcha.getResponse());
  document.querySelectorAll(".g-recaptcha").forEach((checkbox) => {
    checkbox.classList.add("hidden");
  });
  document.querySelectorAll(".form-submit").forEach((button) => {
    button.innerHTML = "Envoyer";
    button.disabled = false
  });
}