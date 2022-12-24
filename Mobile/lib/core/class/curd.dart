import 'dart:convert';

import 'package:hardwhere/core/class/status_request.dart';
import 'package:dartz/dartz.dart';
import '../functions/check_internet.dart';
import 'package:http/http.dart' as http;

class Crud {
  Future<Either<StatusRequest, Map>> postData(String linkUrl, Map data) async {
    // try {
      if (await checkInternet()) {
        var response = await http.post(Uri.parse(linkUrl), body: data);
        // if (response.statusCode == 404 || response.statusCode == 400) {
          print(response.body);
         Map responseBody = jsonDecode(response.body);
          return Right(responseBody);
        } else {
          print("statusCode == 404");
          return const Left(StatusRequest.serverFailure);
        }
      // } else {
      //   return const Left(StatusRequest.offlineFailure);
      // }
    // } catch (_) {
    //   return const Left(StatusRequest.offlineFailure);
    // }
  }
}