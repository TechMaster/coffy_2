<!-- TODO: Hãy viết thành một component hoàn chỉnh -->
<template lang="html">
		<nav class="navbar">
		        <div class="navbar-header">
		            <img src="/public/img/coffyText.png" alt="" class="logoHeadXs">
		            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
		                <span class="icon-bar"></span>
		                <span class="icon-bar"></span>
		                <span class="icon-bar"></span>
		            </button>

		        </div>

		        <div class="collapse navbar-collapse" id="myNavbar">
		          <div class="col-lg-12">

		            <div class="col-lg-4 logoHeadLg">
		              <ul class="nav navbar-nav">
		                  <li class="active">
		                    <a href="/" class="aHead">
		                      <img src="/public/img/coffyText.png" alt="" class="logoHead">
		                    </a>
		                  </li>
		              </ul>
		            </div>

		            <div class="col-lg-4">
		              <form class="navbar-form navbar-left" action="/search" method="post">
		                <div class="input-group stylish-input-group">
		                  <input type="text" class="form-control" name='term'  placeholder="Search" style="width:300px">
		                  <span class="input-group-addon">
		                    <button type="submit">
		                      <span class="glyphicon glyphicon-search"></span>
		                    </button>
		                  </span>
		                </div>
		              </form>
		            </div>

		            <div class="col-lg-4">
		              <ul class="nav navbar-nav navbar-right regForm">
		                  <li class="col-xs-6">
		                    <a href="javascript:void(0)" id="btn-dangnhap">
		                      <span class="fix-br">
		                        <i class="glyphicon glyphicon-log-in"></i>
		                        Đăng nhập
		                      </span>
		                      </a>
		                    </li>
		                  <li class="col-xs-6">
		                    <a href="javascript:void(0)" id="btn-dangki">
		                      <span class="fix-br">
		                        <i class="glyphicon glyphicon-user"></i>
		                        Đăng kí
		                      </span>
		                    </a>
		                  </li>
		              </ul>
		            </div>

		          </div>
		        </div>
		</nav>

</template>
<script>
	export default {
		props : ["search"]
	}
</script>
