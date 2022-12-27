
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hardwhere/core/shared/toast.dart';

import '../core/class/status_request.dart';
import '../core/functions/handling_data_controller.dart';
import '../data/data_source/remote/fav_data.dart';

abstract class FavController extends GetxController {
  deleteItem(int proId) ;
  getData();
}

class FavControllerImp extends FavController {
FavData favData = FavData(Get.find());
late StatusRequest statusRequest;



  @override
  void onInit() {
    statusRequest = StatusRequest.loading;
    getData();
    super.onInit();
  }
List items = [];



@override
getData() async {
  statusRequest = StatusRequest.loading;
  var response = await favData.getData();
  print("=============================== Controller $response ");
  statusRequest = handlingData(response);
  if (StatusRequest.success == statusRequest) {
    if (response['status'] == true) {
      items.addAll(response['data']);
    } else {
      statusRequest = StatusRequest.failure;
    }
  }
  update();
}

@override
deleteItem(proId) async {
  statusRequest = StatusRequest.loading;
  var response = await favData.deletePro(proId);
  print("=============================== Controller $response ");
  statusRequest = handlingData(response);
  if (StatusRequest.success == statusRequest) {
    if (response['status'] == true) {
      toast(response['message'], Colors.green);
    } else {
      statusRequest = StatusRequest.failure;
    }
  }

  items.clear();
  await getData();

  update();
}
}