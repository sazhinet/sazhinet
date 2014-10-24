function MlImageOn (imgname) {
  document.images[imgname].src = onImgArray[imgname].src;
}

function MlImageOff (imgname) {
  document.images[imgname].src = offImgArray[imgname].src;
}

var offImgArray = new Array();
var onImgArray = new Array();
var imagesPath = '/assets/';

offImgArray['ml_img_1_1'] = new Image ();
offImgArray['ml_img_2_1'] = new Image ();
offImgArray['ml_img_3_1'] = new Image ();
offImgArray['ml_img_4_1'] = new Image ();
offImgArray['ml_img_5_1'] = new Image ();
offImgArray['ml_img_6_1'] = new Image ();
offImgArray['ml_img_7_1'] = new Image ();
offImgArray['ml_img_1_1'].src = imagesPath + 'home.jpg';
offImgArray['ml_img_2_1'].src = imagesPath + 'technology.jpg';
offImgArray['ml_img_3_1'].src = imagesPath + 'objects.jpg';
offImgArray['ml_img_4_1'].src = imagesPath + 'pricelist.jpg';
offImgArray['ml_img_5_1'].src = imagesPath + 'guruhelp.jpg';
offImgArray['ml_img_6_1'].src = imagesPath + 'forum.jpg';
offImgArray['ml_img_7_1'].src = imagesPath + 'contacts.jpg';

onImgArray['ml_img_1_1'] = new Image ();
onImgArray['ml_img_2_1'] = new Image ();
onImgArray['ml_img_3_1'] = new Image ();
onImgArray['ml_img_4_1'] = new Image ();
onImgArray['ml_img_5_1'] = new Image ();
onImgArray['ml_img_6_1'] = new Image ();
onImgArray['ml_img_7_1'] = new Image ();
onImgArray['ml_img_1_1'].src = imagesPath + 'home-active.jpg';
onImgArray['ml_img_2_1'].src = imagesPath + 'technology-active.jpg';
onImgArray['ml_img_3_1'].src = imagesPath + 'objects-active.jpg';
onImgArray['ml_img_4_1'].src = imagesPath + 'pricelist-active.jpg';
onImgArray['ml_img_5_1'].src = imagesPath + 'guruhelp-active.jpg';
onImgArray['ml_img_6_1'].src = imagesPath + 'forum-active.jpg';
onImgArray['ml_img_7_1'].src = imagesPath + 'contacts-active.jpg';
