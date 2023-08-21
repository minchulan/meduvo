class SessionsController < ApplicationController
  skip_before_action :authorize_user, only: [:create, :destroy]

  def create #post '/login'
    user = User.find_by_email(params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
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

# authenticate will use the same has and salt to the password that was entered and compare it to what the users stored password is. 

# session is accessible only to our controllers. it's an existing hash {} that's available when we configure sessions in our app.