(function() {

	function isMobileDevice() {
		return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
	};

	// qrCode = document.getElementById('qrCode');
	var audio = document.getElementById("bgMusic");
	audio.muted = true;

	var fire1 = bodymovin.loadAnimation({
		container: document.getElementById("fire1"),
		renderer: 'svg',
		loop: true,
		autoplay: true,
		path: "./assets/fire.json"
	})

	var fire2 = bodymovin.loadAnimation({
		container: document.getElementById("fire2"),
		renderer: 'svg',
		loop: true,
		autoplay: true,
		path: "./assets/fire.json"
	})

	function ready(fn) {
		if (document.readyState != 'loading'){
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}
	
	function makeSnow(el) {
		var ctx = el.getContext('2d');
		var width = 0;
		var height = 0;
		var particles = [];
		
		var Particle = function() {
			this.x = this.y = this.dx = this.dy = 0;
			this.reset();
		}
		
		Particle.prototype.reset = function() {
			this.y = Math.random() * height;
			this.x = Math.random() * width;
			this.dx = (Math.random() * 1) - 0.5;
			this.dy = (Math.random() * 0.5) + 0.5;
		}
		
		function createParticles(count) {
			if (count != particles.length) {
				particles = [];
				for (var i = 0; i < count; i++) {
					particles.push(new Particle());
				}
			}
		}
				
		function onResize() {
			width = window.innerWidth;
			height = window.innerHeight;
			el.width = width;
			el.height = height;
			
			createParticles((width * height) / 10000);
		}
		
		function updateParticles() {
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = '#666666';
			
			particles.forEach(function(particle) {
				particle.y += particle.dy;
				particle.x += particle.dx;
				
				if (particle.y > height) {
					particle.y = 0;
				}
				
				if (particle.x > width) {
					particle.reset();
					particle.y = 0;
				}
				
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2, false);
				ctx.fill();
			});
			
			window.requestAnimationFrame(updateParticles);
		}
		
		onResize();
		updateParticles();
		
		window.addEventListener('resize', onResize);
	}
	
	ready(function() {
		var canvas = document.getElementById('snow');
		makeSnow(canvas);
		
	});
})();

function playAudio() {
	var audio = document.getElementById("bgMusic");
	console.log(audio.muted);
	audio.muted = !audio.muted;
	audio.play();
	var image = document.getElementById("muteButton");
	if(audio.muted) {
		image.src = "/assets/muted.png"
	} else {
		image.src = "/assets/unmuted.png"
	}
}

function onVisibilityChange() {
	var audio = document.getElementById("bgMusic");
	return document.hidden ? audio.pause() : audio.play()
}

document.addEventListener("visibilitychange", onVisibilityChange)
var helpDiv = document.getElementById("helpDiv");

function openHelp() {
	helpDiv.style.display = "block";
}

function closeHelp() {
	helpDiv.style.display = "none";
}

window.onclick = function(e) {
	if(e.target == helpDiv){
		helpDiv.style.display = "none";
	}
}