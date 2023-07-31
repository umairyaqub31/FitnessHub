import {Config} from '@config';
import axios from 'axios';
export default class FitnessHub {
  static login = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    };

    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(
        `${Config.fitnessHub.url}api/user/login`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static trainerLogin = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    };

    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(
        `${Config.fitnessHub.url}api/trainer/login`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static register = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    };

    let pNumber = '';
    if (data.country) {
      pNumber = '+' + data.country.callingCode[0] + data.phoneNumber;
    } else {
      pNumber = '+92' + data.phoneNumber;
    }

    const body = {
      name: data.fullName,
      phone: pNumber,
      email: data.email,
      password: data.password,
      address: 'Qila KalarWala, Pakistan.',
      latitude: data.latlng.latitude,
      longitude: data.latlng.longitude,
    };

    try {
      const response = await axios.post(
        `${Config.fitnessHub.url}api/user`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  static trainerRegister = async data => {
    console.log("==> Api Data : ", data)
    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    };

    console.log("\n\n ==>> Tauseef Ruuning")

    let pNumber = '';
    if (data.country) {
      pNumber = '+' + data.country.callingCode[0] + data.phoneNumber;
    } else {
      pNumber = '+92' + data.phoneNumber;
    }

   

    const body = {
      name: data.fullName,
      email: data.email,
      phone: pNumber,
      password: data.password,
      gymAffiliation: data.gymAffiliation,
      experience: data.experience,
      specialization: data.specialization,
      latitude: data.latlng.latitude,
      longitude: data.latlng.longitude,
      certificateUrl: data.certificateUrl,
    };

   

    try {
      console.log("\n\n\n ===>> body", body);
      const response = await axios.post(
        `${Config.fitnessHub.url}api/trainer`,
        body,
        config,
      );
      console.log("=====>> Api Response  : ", response)
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static socialLogin = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    };

    const body = {
      name: data.name,
      phone: data.phoneNumber,
      email: data.email,
      address: 'Qila KalarWala, Pakistan.',
      latitude: data.latitude,
      longitude: data.longitude,
      imageUrl: data.imageUrl,
      source: data.source,
    };

    try {
      const response = await axios.post(
        `${Config.fitnessHub.url}api/user/registerSocial`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static trainerSocialLogin = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    };

    const body = {
      name: data.fullName,
      phone: data.phoneNumber,
      email: data.email,
      address: 'Qila KalarWala, Pakistan.',
      latitude: '86576276',
      longitude: '86876',
      imageUrl: data.imageUrl,
      source: data.source,
    };

    try {
      const response = await axios.post(
        `${Config.fitnessHub.url}api/trainer/registerSocialTrainer`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static resetPassword = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    };

    const body = {
      phone: data.phoneNumber,
      password: data.password,
    };

    try {
      const response = await axios.put(
        `${Config.fitnessHub.url}api/user/ResetPassword`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static trainerResetPassword = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    };

    const body = {
      phone: data.phoneNumber,
      password: data.password,
    };

    try {
      const response = await axios.put(
        `${Config.fitnessHub.url}api/trainer/ResetPassword`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static getTrainers = async token => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
        'x-auth-token': token,
      },
    };

    try {
      const response = await axios.get(
        `${Config.fitnessHub.url}api/trainer`,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static getTrainersByLocation = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
        'x-auth-token': data.user.token,
      },
    };

    const body = {
      latitude: data.latitude,
      longitude: data.longitude,
    };

    try {
      const response = await axios.get(
        `${Config.fitnessHub.url}api/trainer/findTrainerUsingLocation`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  // Packages api's

  static getPackages = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
        'x-auth-token': data.token,
      },
    };

    try {
      const response = await axios.get(
        `${Config.fitnessHub.url}api/package?userId=${data.id}`,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static addPackage = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
        'x-auth-token': data.user.token,
      },
    };

    const body = {
      userId: data.user._id,
      multiplier: data.multiplier,
      timeMatter: data.timeMatter,
      price: data.price,
    };

    try {
      const response = await axios.post(
        `${Config.fitnessHub.url}api/package`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static updatePackage = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
        'x-auth-token': data.user.token,
      },
    };

    const body = {
      packageId: data.packageId,
      userId: data.user._id,
      multiplier: data.multiplier,
      timeMatter: data.timeMatter,
      price: data.price,
    };

    try {
      const response = await axios.put(
        `${Config.fitnessHub.url}api/package`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static deletePackage = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    };

    try {
      const response = await axios.delete(
        `${Config.fitnessHub.url}api/package?packageId=${data.packageId}`,
        // body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static submitReport = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
        'x-auth-token': data.user.token,
      },
    };

    const body = {
      admin_id: data.user._id,
      created_date: data.progress.date,
      goal: data.progress.goal,
      current: data.progress.currentWeight,
      set_goal: data.progress.targetWeight,
      target_area: data.progress.targetArea,
      exercise: data.progress.exercise,
      sets: data.progress.sets,
      weight_load: data.progress.weightLoad,
      repetition: data.progress.repetition,
      calories_burt: data.progress.caloriesBurnt,
      time: data.progress.time,
      distance: data.progress.distance,
    };

    try {
      const response = await axios.post(
        `${Config.fitnessHub.url}api/user/saveDailyProgress`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static submitBookmark = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
        'x-auth-token': data.user.token,
      },
    };

    const body = {
      userId: data.user._id,
      trainerId: data.trainerId,
    };

    try {
      const response = await axios.post(
        `${Config.fitnessHub.url}api/user/bookMarkTraier`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static getBookmarks = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
        'x-auth-token': data.user.token,
      },
    };

    const body = {
      userId: data.user._id,
    };

    try {
      const response = await axios.post(
        `${Config.fitnessHub.url}api/user/getBookMarkData`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static submitReview = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
        'x-auth-token': data.user.token,
      },
    };

    const body = {
      admin_id: data.user._id,
      trainer_id: data.trainerId,
      reviewValue: data.rating,
      message: data.reviewMessage,
      image: data.imageUrl,
    };

    try {
      const response = await axios.post(
        `${Config.fitnessHub.url}api/review/submitReviews`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static searchTrainer = async data => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
        'x-auth-token': data.user.token,
      },
    };

    const body = {
      challenge: data.challenge,
    };

    try {
      const response = await axios.post(
        `${Config.fitnessHub.url}api/user/searchTrainer`,
        body,
        config,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
}
