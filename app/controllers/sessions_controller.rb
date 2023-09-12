class SessionsController < ApplicationController
  skip_before_action :authorize_user, only: [:create, :destroy]

  def create #post '/login'
    user = User.find_by_email(params[:email])
    if user&.authenticate(params[:password]) 
      session[:user_id] = user.id #auto logs in user 
      render json: user, status: :ok
    else
      render json: { errors: "Invalid username or password" }, status: :unauthorized
    end
  end

  def destroy #delete '/logout'
    session.delete :user_id
    head :no_content
  end
end