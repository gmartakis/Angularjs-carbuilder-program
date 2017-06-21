<?php

class Application_Form_Newsletter extends Zend_Form {
	public function init() {
		$this -> setAction('/tools/newsletter/process.html');
		$this -> setMethod('post');
		$this -> setDecorators(array('FormElements', 'Form'));
		$this -> setDisplayGroupDecorators(array('FormElements'));
		$this -> setElementDecorators(array('ViewHelper'));

		$kit_disclaimer = new Zend_Form_Element_Note('keep_touch');
		$kit_disclaimer -> setValue('<span class="legend">ΚΡΑΤΗΣΤΕ ΕΠΑΦΗ</span>
		 <span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">
		 <img alt="Help: " src="/skin/images/common/info-icon-medium.png">
		 <span class="after" style="display: none; height: 215px; padding-top: 10px; margin-top: 10px; padding-bottom: 10px; margin-bottom: 0px;">
		 Η Νικ. Ι. Θεοχαράκης ΑΕ συλλέγει πληροφορίες απο όλους τους χρήστες σε αρκετα
		 σημεία στις ιστοσελίδες μας<br>Η Νικ. Ι. Θεοχαράκης ΑΕ είναι ο μοναδικός
		 κάτοχος όλων των πληροφοριών που συλλέγονται στις ιστοσελίδες.<br>Δεν θα
		 πουλήσουμε ή ενοικιάσουμε αυτές τις πληροφορίες σε άλλους. Θα μοιραστούμε αυτές
		 τις πληροφορίες με τους συνεργάτες μας και τους αντιπροσώπους μας και τα διαφημιστικά
		 γραφεία που έχουν υπογράψει συμβάσεις συνεργασίας με εμάς για παροχή υπηρεσιών για
		 εμάς (π.χ. διαφημιστικό υλικό).</span></span>');
		$kit_disclaimer -> addDecorators(array('ViewHelper', 'Errors', array('HtmlTag', array('tag' => 'p')), array('Label', array('tag' => '')), ));

		$email = $this -> createElement('text', 'kit_email', array('placeholder' => 'Εισάγετε το email σας'));
		$email -> addValidators(array( array('NotEmpty', true), array('EmailAddress'), array('stringLength', false, array(6, 20))));
		$email -> setRequired('true');
		$email -> addFilter('StringToLower') -> addFilter('StringTrim');
		$email -> addErrorMessage('Θα πρέπει να εισάγετε το email σας!');

		$nithae_disclaimer = new Zend_Form_Element_Note('terms');
		$nithae_disclaimer -> setValue('Με την υποβολή, συμφωνείτε να ενημερώνεστε από την Νικ. Ι. Θεοχαράκης ΑΕ.');
		$nithae_disclaimer -> addDecorators(array('ViewHelper', 'Errors', array('HtmlTag', array('tag' => 'p')), array('Label', array('tag' => '')), ));

		$this -> addElement($kit_disclaimer);
		$this -> addElement($email);
		$submit = $this -> addElement('submit', 'submit', array('label' => 'OK'));
		$this -> addDisplayGroup(array('kit_email', 'submit'), 'set_std', array('class' => 'std'));
		$group = $this -> getDisplayGroup('set_std');
		$group -> removeDecorator('DtDdWrapper');
		$this -> addElement($nithae_disclaimer);
	}

}
