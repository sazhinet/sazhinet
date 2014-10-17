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
offImgArray['ml_img_1_1'].src = imagesPath + 'menu_01.jpg';
offImgArray['ml_img_2_1'].src = imagesPath + 'menu_02.jpg';
offImgArray['ml_img_3_1'].src = imagesPath + 'menu_03.jpg';
offImgArray['ml_img_4_1'].src = imagesPath + 'menu_04.jpg';
offImgArray['ml_img_5_1'].src = imagesPath + 'menu_05.jpg';
offImgArray['ml_img_6_1'].src = imagesPath + 'menu_06.jpg';
offImgArray['ml_img_7_1'].src = imagesPath + 'menu_07.jpg';

onImgArray['ml_img_1_1'] = new Image ();
onImgArray['ml_img_2_1'] = new Image ();
onImgArray['ml_img_3_1'] = new Image ();
onImgArray['ml_img_4_1'] = new Image ();
onImgArray['ml_img_5_1'] = new Image ();
onImgArray['ml_img_6_1'] = new Image ();
onImgArray['ml_img_7_1'] = new Image ();
onImgArray['ml_img_1_1'].src = imagesPath + 'menu_over_01.jpg';
onImgArray['ml_img_2_1'].src = imagesPath + 'menu_over_02.jpg';
onImgArray['ml_img_3_1'].src = imagesPath + 'menu_over_03.jpg';
onImgArray['ml_img_4_1'].src = imagesPath + 'menu_over_04.jpg';
onImgArray['ml_img_5_1'].src = imagesPath + 'menu_over_05.jpg';
onImgArray['ml_img_6_1'].src = imagesPath + 'menu_over_06.jpg';
onImgArray['ml_img_7_1'].src = imagesPath + 'menu_over_07.jpg';
