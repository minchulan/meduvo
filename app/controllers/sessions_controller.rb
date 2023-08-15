class SessionsController < ApplicationController
  skip_before_action :authenticate_user, only: [:create, :destroy]

  def create
    user = User.find_by_email(params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render_unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
    current_user = nil # Clear the memoized current user
  end
end
