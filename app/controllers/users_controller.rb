class UsersController < ApplicationController
  before_action :find_user, only: [:show, :update, :destroy]
  skip_before_action :authorize_user, only: [:create] 

  def show
    render json: @user, status: :ok 
  end

  def create
    user = User.create(user_params)
    if user
      render json: user, status: :created
    else  
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end  
  end

  def update
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    session.delete :user_id
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def find_user 
    @user = current_user
    render_not_found unless @user 
  end 
end