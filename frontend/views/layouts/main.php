<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use frontend\assets\AppAsset;
use common\widgets\Alert;

//AppAsset::register($this);
$this->metaTags[] = "<meta name='keywords' content='承德山水御园,山水御园,承德山水御园居住小区,承德山水御园房价,山水御园房价,山水御园居住小区,御园房价,山水御园居住小区信息,承德山水'/>";
$this->metaTags[] = "<meta name='description' content='承德山水御园,山水御园,承德山水御园居住小区,承德山水御园房价,山水御园房价,山水御园居住小区,御园房价,山水御园居住小区信息,承德山水'/>";
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head data-page="Anjuke_Prop_View" data-kw="" data-ppc="/bj/prop/click/1049250940?isauction=0&referer=https://m.anjuke.com/bj/sale" data-new-ppc='{"v":"2.0","channel":7,"userId":0,"userType":0,"buid":0,"tradeType":1,"proId":1049250940,"COMMID":52407,"brokerId":1818705,"brokerType":2,"hpType":0,"entry":123}' data-soj-php="">
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <script type="text/javascript" src="/js/jquery-1.8.3.min.js"></script>
    <meta charset="utf-8">
    <meta name="format-detection" content="telephone=no"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,minimal-ui"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta content="yes" name="apple-touch-fullscreen">
    <meta name="applicable-device" content="mobile">
    <meta name="location" content="province=北京;city=北京;coord=116.39985,39.912233">
    <link rel="stylesheet" rev="stylesheet" href="https://include.anjukestatic.com/tw/res/20171128.953.1/b/User_Touch_Anjuke_Property_ViewRevision.css" type="text/css" />
    <link rel="apple-touch-icon-precomposed"  href="//pages.anjukestatic.com/usersite/touch/img/app/144x144.png">
    <link rel="Shortcut Icon" href="https://pages.anjukestatic.com/usersite/touch/img/favicon.ico" type="image/x-icon"/>
    <script type="text/javascript">
        window.APF={};
        APF.info = {
            cityAlias:"bj",
            pageName:"Anjuke_Prop_View"
        };
        APF.soj_source_h5 = {
            app: '',
            os: '',
            ver: ''
        }
    </script>
</head>
<?php $this->beginBody() ?>
<body data-page="Anjuke_Prop_View" ontouchstart="">
    <?= $content ?>
</body>
</html>
<?php $this->endBody() ?>
<?php $this->endPage() ?>
