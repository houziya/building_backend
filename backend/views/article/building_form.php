<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use dosamigos\datepicker\DatePicker;

if (!empty($model->question)) {
    $question_list = explode(',', $model->question);
}
?>

<div class="article-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'title')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'content')->widget('common\widgets\ueditor\Ueditor',[
        'options'=>[
            'initialFrameWidth' => 850,
        ]
    ]) ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? '保存' : '更新', ['class' => $model->isNewRecord ? 'btn btn-primary' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
<script>
    $(document).ready(function () {
        //显示问题
        $("input:radio").click(function (e) {
            $show = $("input:radio")[0].checked;
            $hide = $("input:radio")[1].checked;
            if ($show) {
                $("#question_group").show();
            }
            if ($hide) {
                $("#question_group").hide();
            }
        });
        //添加答案
        $("#btn_add").click(function () {
            var answer_groupon = $("#answer_group");
            var count = answer_groupon.children().length;
            var code = String.fromCharCode(65 + count);
            var node = '<div class="input-group" style="margin-bottom: 10px"><span class="input-group-addon">' + code + '</span><input type="text" class="form-control" name="answer[]"></div>';
            var answers = $("#answers");
            var answer_node = '<label class="radio-inline"> <input type="radio" name="correct_answer" value="' + count + '"> ' + code + ' </label>';

            if (count < 5) {
                answer_groupon.append(node);
                answers.append(answer_node);
            }

        });

        //移除问题
        $("#btn_del").click(function () {
            var answer_groupon = document.getElementById('answer_group');
            var div = answer_groupon.getElementsByTagName('div');
            var count = $("#answer_group").children().length;

            var answers = document.getElementById("answers");
            var answer_label = answers.getElementsByTagName('label');

            if (count > 2) {
                var node = div[count - 1];
                answer_groupon.removeChild(node);
                answers.removeChild(answer_label[count]);
            }

        });
    });
</script>