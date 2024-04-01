(function () {
  "use strict";

  // Simulating jQuery's $ function
  function $(selector, context) {
    context = context || document;
    return context.querySelector(selector);
  }

  // Simulating jQuery's each function
  function each(collection, callback) {
    for (var i = 0; i < collection.length; i++) {
      callback.call(collection[i], i, collection[i]);
    }
  }

  function twitterVideoPlayer(rootElement) {
    const video_element = rootElement.querySelector("[data-video]");
    const video_preview = rootElement.querySelector(".video-preview");
    const video_top = rootElement.querySelector(".video-top");
    const video_start_btn = rootElement.querySelector(".video-start-btn");
    const video_control_btn = rootElement.querySelector(".video-control-btn");
    const video_control_play = rootElement.querySelector(".video-control-play");
    const video_control_pause = rootElement.querySelector(".video-control-pause");
    const video_voice = rootElement.querySelector(".video-voice");
    const video_voice_btn = rootElement.querySelector(".video-voice-btn");
    const video_voice_on = rootElement.querySelector(".video-voice-on");
    const video_voice_off = rootElement.querySelector(".video-voice-off");
    const full_screen_btn = rootElement.querySelector(".full-screen-btn");
    const full_screen_open = rootElement.querySelector(".full-screen-open");
    const full_screen_exit = rootElement.querySelector(".full-screen-exit");
    const video_voice_slider = rootElement.querySelector(".video-voice-slider-range");
    const video_voice_rail = rootElement.querySelector(".video-voice-slider-rail");
    const video_voice_buffer = rootElement.querySelector(".video-voice-slider-buffer");
    const video_slider = rootElement.querySelector(".video-slider-container");
    const video_slider_rail = rootElement.querySelector(".video-slider-rail");
    const video_slider_buffer = rootElement.querySelector(".video-slider-buffer");
    const video_count_time = rootElement.querySelector(".video-count-time");
    const video_count_fulltime = rootElement.querySelector(".video-count-fulltime");
    const video_loading = rootElement.querySelector(".video-loading");
    const video_reset = rootElement.querySelector(".video-reset");
    const video_reset_btn = rootElement.querySelector(".video-reset-btn");
    const video_contextMenu = rootElement.querySelector(".video-contextMenu");

    var vid = video_element;

    function play() {
      vid.play();
      video_control_play.style.display = "none";
      video_control_pause.style.display = "block";
    }

    function pause() {
      vid.pause();
      video_control_pause.style.display = "none";
      video_control_play.style.display = "block";
    }

    function loading() {
      if (vid.readyState === 4) {
        video_loading.style.display = "none";
        play();
      } else {
        video_loading.style.display = "block";
        pause();
      }
    }

    function voiceOn() {
      vid.muted = true;
      video_voice_on.style.display = "none";
      video_voice_off.style.display = "block";
    }

    function voiceOff() {
      vid.muted = false;
      video_voice_on.style.display = "block";
      video_voice_off.style.display = "none";
    }

    function Fullscreen(element) {
      if (element.requestFullscreen) element.requestFullscreen();
      else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
      else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
      else if (element.msRequestFullscreen) element.msRequestFullscreen();
      full_screen_open.style.display = "none";
      full_screen_exit.style.display = "block";
    }

    function exitFullscreen() {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      full_screen_open.style.display = "block";
      full_screen_exit.style.display = "none";
    }

    function IsFullScreen() {
      var full_screen_element =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        null;

      if (full_screen_element === null) return false;
      else return true;
    }

    function updateplayer() {
      var percentage = (vid.currentTime / vid.duration) * 100;
      video_slider_rail.style.width = percentage + "%";
      video_slider_buffer.style.left = percentage - 1 + "%";
      video_count_time.textContent = getFormatedTime();
      video_count_fulltime.textContent = getFormatedFullTime();
    }

    function getTimeState() {
      var mouseX = event.pageX - video_slider.offsetLeft,
        width = video_slider.offsetWidth;

      var currentSeconeds = Math.round((mouseX / width) * vid.duration);
      var currentMinutes = Math.floor(currentSeconeds / 60);

      if (currentMinutes > 0) {
        currentSeconeds -= currentMinutes * 60;
      }
      if (currentSeconeds.toString().length === 1) {
        currentSeconeds = "0" + currentSeconeds;
      }
      if (currentMinutes.toString().length === 1) {
        currentMinutes = "0" + currentMinutes;
      }

      return currentMinutes + ":" + currentSeconeds;
    }

    function skip() {
      var mouseX = event.pageX - video_slider.offsetLeft,
        width = video_slider.offsetWidth;
      vid.currentTime = (mouseX / width) * vid.duration;
      updateplayer();
    }

    function getFormatedFullTime() {
      var totalSeconeds = Math.round(vid.duration);
      var totalMinutes = Math.floor(totalSeconeds / 60);
      if (totalMinutes > 0) {
        totalSeconeds -= totalMinutes * 60;
      }
      if (totalSeconeds.toString().length === 1) {
        totalSeconeds = "0" + totalSeconeds;
      }
      if (totalMinutes.toString().length === 1) {
        totalMinutes = "0" + totalMinutes;
      }
      return totalMinutes + ":" + totalSeconeds;
    }

    function getFormatedTime() {
      var seconeds = Math.round(vid.currentTime);
      var minutes = Math.floor(seconeds / 60);

      if (minutes > 0) {
        seconeds -= minutes * 60;
      }
      if (seconeds.toString().length === 1) {
        seconeds = "0" + seconeds;
      }
      if (minutes.toString().length === 1) {
        minutes = "0" + minutes;
      }
      return minutes + ":" + seconeds;
    }

    video_start_btn.addEventListener("click", function () {
      video_preview.style.display = "none";
      play();
    });

    vid.addEventListener("progress", loading);

    video_control_btn.addEventListener("click", function () {
      if (vid.paused) {
        play();
      } else {
        pause();
      }
    });

    video_top.addEventListener("click", function () {
      if (vid.paused) {
        play();
      } else {
        pause();
      }
    });

    video_voice_btn.addEventListener("click", function () {
      if (vid.muted === false) {
        voiceOn();
      } else {
        voiceOff();
      }
    });

    full_screen_btn.addEventListener("click", function () {
      if (IsFullScreen()) exitFullscreen();
      else Fullscreen(video_element);
    });

    video_top.addEventListener("dblclick", function () {
      if (IsFullScreen()) exitFullscreen();
      else Fullscreen(video_element);
    });

    video_voice_slider.addEventListener("input", function () {
      var range = video_voice_slider.value;
      vid.volume = range;
      video_voice_buffer.style.width = range * 100 + "%";
      if (range == 0) {
        voiceOn();
      } else {
        voiceOff();
      }
    });

    video_voice_slider.addEventListener("change", function () {
      var range = video_voice_slider.value;
      localStorage.setItem("videoVoice", range);
    });

    video_voice_slider.value = localStorage.getItem("videoVoice") || 1;

    video_voice_slider.addEventListener("keyup", function () {
      var range = video_voice_slider.value;
      vid.volume = range;
      video_voice_buffer.style.width = range * 100 + "%";
      if (range == 0) {
        voiceOn();
      } else {
        voiceOff();
      }
    });

    video_slider.addEventListener("click", skip);

    updateplayer();
    video_count_fulltime.textContent = getFormatedFullTime();

    vid.addEventListener("timeupdate", function () {
      updateplayer();
    });

    video_slider_buffer.addEventListener("input", function () {
      updateplayer();
    });

    video_slider_buffer.addEventListener("mousemove", function () {
      updateplayer();
    });

    video_slider_buffer.addEventListener("mouseup", function () {
      updateplayer();
    });

    video_voice.addEventListener("mouseenter", function () {
      video_slider.style.display = "none";
    });

    video_voice.addEventListener("mouseleave", function () {
      video_slider.style.display = "block";
    });

    vid.addEventListener("ended", function () {
      video_reset.style.display = "flex";
    });

    video_reset_btn.addEventListener("click", function () {
      play();
      video_reset.style.display = "none";
    });

    video_element.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      video_contextMenu.style.display = "block";
      video_contextMenu.style.top = event.clientY + "px";
      video_contextMenu.style.left = event.clientX + "px";
    });

    window.addEventListener("click", function () {
      video_contextMenu.style.display = "none";
    });
  }

  window.twitterVideoPlayer = twitterVideoPlayer;

  // Apply the twitterVideoPlayer function to all elements with class 'video'
  var videoPlayers = document.querySelectorAll(".video");
  each(videoPlayers, function (index, player) {
    twitterVideoPlayer(player);
  });
})();
