module.exports = {
  html(params = {}) {
    let title = `SSSTUTTER`;
    let description = `REFINED FROM INSIDE`;
    return `
			<!DOCTYPE html>
			<html lang="vi">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
				<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
				<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
				<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
				<link rel="manifest" crossorigin="use-credentials" href="/assets/favicon/site.webmanifest">
				<link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#5bbad5">
				<meta name="msapplication-TileColor" content="#da532c">
				<!-- Global site tag (gtag.js) - Google Analytics -->
				<script async src="https://www.googletagmanager.com/gtag/js?id=UA-126233540-1"></script>
				<script>
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', 'UA-126233540-1');
				</script>
				<meta name="theme-color" content="#ffffff">
				<title>${params.title || title}</title>
				<meta name="description" content="${params.description || description}" />

				<link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Italianno&display=swap" rel="stylesheet">

				<link rel="stylesheet" href="/assets/css/styles.css">
				<script>
					${params.command || ""}
				</script>
			</head>
			<body>
				<main id="root"></main>
				<script src="/assets/js/share/glide.min.js"></script>
				<script type="module" src="/assets/js/main.js"></script>
				<script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>
			</body>
			</html>
		`;
  },

  error_404(params = {}) {
    let title = `404 NOT FOUND`;
    let description = `Trang web này không tồn tại`;
    return `
			<!DOCTYPE html>
			<html lang="vi">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
				<title>${params.title || title}</title>
				<meta name="description" content="${description}" />
				<style>
					* {
				    transition: all 0.6s;
					}

					html {
				    height: 100%;
					}

					body{
				    font-family: 'Lato', sans-serif;
				    color: #888;
				    margin: 0;
					}

					#main {
				    display: table;
				    width: 100%;
				    height: 100vh;
				    text-align: center;
					}

					.fof {
					  display: grid;
					  place-content:center;
					  width: 100%;
					  height: 100%;
					}

					.fof h1 {
					  display: inline-block;
					  padding-right: 12px;
					  animation: type .5s alternate infinite;
					}
					.fof button {
						border: thin solid black;
					}
					.fof button > a {
						text-decoration: none;
						color: gray;
						display:block;
						padding : 15px;
						background: white
					}
					@keyframes type{
					  from{box-shadow: inset -3px 0px 0px #888;}
					  to{box-shadow: inset -3px 0px 0px transparent;}
					}
				</style>
			</head>
			<body>
				<div id="main">
		    	<div class="fof">
					<h1>${params.message || "Trang này không tồn tại !"}</h1>
					<button><a href="/">Trở về trang chủ</a></button>
		    	</div>
				</div>
			</body>
			</html>
		`;
  },
};
