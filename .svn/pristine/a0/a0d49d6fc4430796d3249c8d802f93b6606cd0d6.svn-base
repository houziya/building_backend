<?php

namespace backend\controllers;

use common\models\ZyrjCash;
use common\models\ZyrjCashSearch;
use common\models\ZyrjFck;
use common\models\ZyrjFee;
use Yii;
use yii\web\UploadedFile;

class OrderController extends \yii\web\Controller
{
    public function actionBuyList()
    {
        $searchModel = new ZyrjCashSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        $configParams = ZyrjFee::findOne(["id"=>1]);
        return $this->render('buy-list', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
            's12' => $configParams["s12"],
        ]);
    }

    public function actionSellList()
    {
        $searchModel = new ZyrjCashSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams, 1);

        $configParams = ZyrjFee::findOne(["id"=>1]);
        return $this->render('sell-list', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
            's12' => $configParams["s12"],
        ]);
    }

    public function actionDelete()
    {
        $orderId = intval(Yii::$app->request->get("id"));
        $orderInfo = ZyrjCash::findOne(["id" => $orderId, "is_done" => 0]);
        if ((time() - $orderInfo["rdt"]) >= 24 * 3600) {
            return $this->redirect("buy-list");
        }
        if ($orderInfo['money_type'] == 2) {
            //减少挂卖金额
            $memberModel = ZyrjFck::findOne($orderInfo['uid']);
            $memberModel->xx_money -= $orderInfo['money'];
            $memberModel->save(false);
        }
        ZyrjCash::deleteAll(["id"=>$orderId]);
        $this->redirect("buy-list");
    }

    public function actionView($id)
    {
        $model = $this->findModel($id);
        return $this->render('sell-view', [
            'model' => $model,
            'memberModel' => $this->findMemberModel($model->uid),
            'matchModel' => $this->findModel($model->match_id)
        ]);
    }

    public function actionBuyView($id)
    {
        $model = $this->findModel($id);
        return $this->render('buy-view', [
            'model' => $model,
            'memberModel' => $this->findMemberModel($model->sid),
            'matchModel' => $this->findModel($model->match_id)
        ]);
    }

    public function actionMatchs()
    {
        $buyOrders = Yii::$app->request->post("buy_order");
        $sellOrders = Yii::$app->request->post("sell_order");
        $this->authMatch($buyOrders, $sellOrders);
        //exit;
        return $this->render('matchs', [
            "buy_order" => $buyOrders,
            "sell_order" => $sellOrders
        ]);
    }

    protected function authMatch($buyOrders, $sellOrders){
        if(empty($buyOrders) || empty($sellOrders)){
            Yii::$app->getSession()->setFlash('error', '请输入进场和出场单号!!!');
        }

        $buyWhere = [
            "x1"=>explode(",", $buyOrders),
            "match_num"=> 0,
            "is_pay"=> 0,
            "is_cancel"=> 0,
            "is_done"=> 0,
            "type"=> 0
        ];
        $buyOrdersList = ZyrjCash::findAll($buyWhere);
        $sellWhere = [
            "x1"=>explode(",", $buyOrders),
            "is_pay"=> 0,
            "is_cancel"=> 0,
            "is_done"=> 0,
            "type"=> 1
        ];
        $sellOrdersList = ZyrjCash::findAll($sellWhere);

        if(empty($buyOrdersList) || empty($sellOrdersList)){
            Yii::$app->getSession()->setFlash('error', '找不到有效订单');
        }

        $matchRes = [];
        foreach ($buyOrdersList as $key => $bbb) {
            $abs = array();
            $target = array();
            foreach ($sellOrdersList as $skey => $sss) {
                $dist = $bbb['money'] - $sss['money'];
                $abs[$skey] = abs($dist);
            }
            if(empty($cash_srs)){
                continue;
            }
            $pos = array_search(min($abs), $abs);
            //$ttt = mysql_fetch_array($abs);
            $matchRes[] = $this->matchs($bbb['x1'], $cash_srs[$pos]['x1']);
            unset($buyOrdersList[$pos]);
            unset($sellOrdersList[$key]);
        }

        if ($matchRes) {
            $inOrderList = [];
            $outOrderList = [];
            foreach($matchRes as $match){
                if($match["order_type"] == 0){
                    $inOrderList[] = $match["order"];
                }
                if($match["order_type"] == 1){
                    $outOrderList[] = $match["order"];
                }
            }
            //$inOrderList = array_merge($inOrderList, $cash_brs);
            //$outOrderList = array_merge($outOrderList, $cash_srs);
            if(array_column($buyOrdersList, "x1")){
                $inOrderList = array_merge($inOrderList, array_column($buyOrdersList, "x1"));
            }else{
                $inOrderList = $inOrderList;
            }
            if(array_column($sellOrdersList, "x1")){
                $outOrderList = array_merge($outOrderList, array_column($sellOrdersList, "x1"));
            }else{
                $outOrderList = $outOrderList;
            }

            print_r($inOrderList);
            print_r($outOrderList);
            if(empty($inOrderList) && empty($outOrderList)){
                //echo "<script> alert('拆分匹配完成。'); location.href = '/index.php?s=/Public/main'; </script>";
                echo "拆分完成";
                exit;
            }
            $this->automatchall(implode(",", $inOrderList), implode(",", $outOrderList));
        }
    }

    public function actionUpload()
    {
        if (Yii::$app->request->isPost) {
            $model = $this->findModel(Yii::$app->request->post("id"));
            $model->img = UploadedFile::getInstance($model, 'img');
            if ($model->img) {
                $model->img->saveAs("images/" . $model->img->baseName . '.' . $model->img->extension);
                $fileName = Yii::$app->request->post("id") . md5(uniqid()) . "." . $model->img->extension;
                Yii::$app->Aliyunoss->upload("order/" . $fileName, "images/" . $model->img->baseName . '.' . $model->img->extension);
                unlink("images/" . $model->img->baseName . '.' . $model->img->extension);
                $model->img = "order/" . $fileName;
                if($model->save(false)){
                    Yii::$app->getSession()->setFlash('success', '上传成功');
                }
            }
            $this->redirect(["buy-view", "id"=>$model->id]);
        }
    }

    /**
     * Finds the Article model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Article the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findMemberModel($id)
    {
        if (($model = ZyrjFck::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
    /**
     * Finds the Article model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Article the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = ZyrjCash::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
