<!DOCTYPE html>
<html lang="">

<head> @ola 
	<meta harset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">
	<title>Starter Template for Bootstrap 3.3.0</title>
	<link rel="shortcut icon" href="">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap-theme.min.css">
	<style>
		<!-- CSS Test Zone -->
		body {
			padding-top: 50px;

		}
		.starter-template {
			padding: 40px 15px;
			text-align: center;
		}
	</style>
</head> @i
<body>
<body>
	<nav class="navbar navbar-inverse {% $laravel5-variable-echo-syntax %} navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="{{ $variable-echo-syntax }}-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation {{{ $escaped-safe-syntax }}} </span>
					<span class="icon-bar"> {{-- Comment, Only works in single line. Should work multi line too. --}} </span>
					@if($one === 1)<span class="icon-bar">{{{ $one }}}</span>@endif
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Project name</a>
			</div>
			
<?php
/* PHP Test Zone */
echo 'Test Zone for Raw PHP';
if($one === 1)
{
	echo $one;
}
?>
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li class="active"><a href="#">Home</a>
					</li>
					<li><a href="#about">About</a>
					</li>
					<li><a href="#contact">Contact</a>
					</li>
				</ul>
			</div>
			<!--.nav-collapse -->
		</div>
	</nav>

	<div class="container">
		<div class="starter-template">
			<h1>Hello, world!</h1>
			<p class="lead">Now you can start your own project with <a target="_blank" href="http://getbootstrap.com/">Bootstrap 3.3.0</a>. This plugin is a fork from <a href="https://github.com/le717/brackets-html-skeleton#readme">HTML Skeleton</a>.</p>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
</body>

</html>
