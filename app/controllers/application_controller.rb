class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_user 

  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) # memoization 
  end

  private

  def authenticate_user
    render_unauthorized unless current_user
  end

  def render_unauthorized
    render json: { errors: { User: "Not Authorized" } }, status: :unauthorized
  end
end