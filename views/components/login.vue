<template lang="html">
	<div class="login">
	<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-md" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
						aria-hidden="true">&times;</span></button>
					<ul class="nav nav-tabs" id="myTabs" role="tablist">
						<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab"
							data-toggle="tab">Đăng nhập</a></li>
						<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Đăng
							kí</a>
						</li>
					</ul>
				</div>
				<div class="modal-body">
					<div class="tab-content">
						<div role="tabpanel" class="tab-pane active" id="home">
							<form class="form-login-signup">
								<div class="form-group login-form">
									<label for="recipient-name" class="control-label">Email:</label>
									<input type="text" class=" col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
										id="email">
								</div>
								<div class="form-group login-form">
									<label for="message-text" class="control-label">Mật khẩu:</label>
									<input type="password" class="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
										id="password">
								</div>
							</form>
							<div class="btn-login-sign-up">
								<div id="lost-pass">
									<a href="">Quên mật khẩu?</a>
									<input type="checkbox" name="" id=""><span>&nbsp; Ghi nhớ đăng nhập</span>
								</div>
								<div class="socials-login">
									<a href="" id="login-fb" class="color-white">
									<span class="fa fa-facebook text-center background-blue"></span>
									<span class="fix-width-social text-center color-blue">Facebook</span>
									</a>
									<a href="" id="login-gg" class="color-white">
									<span class="fa fa-google-plus text-center background-red"></span>
									<span class="fix-width-social text-center color-red">Google</span>
									</a>
								</div>
								<a href="user-dashboard.html">
								<button type="button" class="btn btn-primary">Đăng Nhập</button>
								</a>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="profile">
							<div role="tabpanel" class="tab-pane active" id="home">
								<form class="form-login-signup">
									<div class="form-group login-form">
										<label for="recipient-name" class="control-label">Email:</label>
										<input type="text" class=" col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
											id="email">
									</div>
									<div class="form-group login-form">
										<label for="message-text" class="control-label">Mật khẩu:</label>
										<input type="password"
											class="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
											id="password">
									</div>
									<div class="form-group login-form">
										<label for="message-text" class="control-label">Xác nhận mật khẩu:</label>
										<input type="password"
											class="col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
											id="password">
									</div>
									<div class="form-group login-form">
										<label for="recipient-name" class="control-label">Họ tên:</label>
										<input type="text" class=" col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control"
											id="username">
									</div>
									<div class="form-group login-form">
										<label for="recipient-name" class="control-label">Số điện thoại:</label>
										<input type="text" class=" col-xs-12 col-sm-12 col-md-4 col-lg-4 form-control">
									</div>
								</form>
								<div class="btn-login-sign-up">
									<a href="">
									<button type="button" class="btn btn-primary">Đăng Kí</button>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<span class="waves-effect" id="btn-to-top">
	    <i class="fa fa-angle-double-up" aria-hidden="true"></i>
	</span>
	</div>
</template>