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
$this->metaTags[] = "<meta name='keywords' content='中道山水御园独立底商,承德德铭大数据产业园,承德商业街独立底商,山水御园底商,承德旺铺出售,承德山水御园,山水御园,承德山水御园居住小区,山水御园居住小区,山水御园居住小区信息'/>";
$this->metaTags[] = "<meta name='description' content='中道山水御园独立底商,承德德铭大数据产业园,承德商业街独立底商,山水御园底商,承德旺铺出售,承德山水御园,山水御园,承德山水御园居住小区,山水御园居住小区,山水御园居住小区信息'/>";
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head data-page="Anjuke_Prop_View" data-kw="">
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <script type="text/javascript" src="/js/jquery-1.8.3.min.js"></script>
    <meta name="baidu-site-verification" content="vcCDtqMYps" />
    <meta charset="utf-8">
    <meta name="format-detection" content="telephone=no"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,minimal-ui"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta content="yes" name="apple-touch-fullscreen">
    <meta name="applicable-device" content="mobile">
    <meta name="location" content="province=北京;city=北京;coord=116.39985,39.912233">
    <link rel="stylesheet" rev="stylesheet" href="/css/building/building.css" type="text/css" />
    <link rel="apple-touch-icon-precomposed"  href="/images/144x144.png">
    <link rel="Shortcut Icon" href="/images/favicon.ico" type="image/x-icon"/>
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
