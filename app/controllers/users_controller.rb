class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def show
    render json: current_user, status: :ok
  end

  def create
    user = User.create(user_params)
    if user
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if current_user.update(user_params)
      render json: current_user, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    current_user.destroy
    session.delete(:user_id)
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
