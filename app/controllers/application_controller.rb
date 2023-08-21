class ApplicationController < ActionController::API
  include ActionController::Cookies #extended the middleware in our ApplicationController

  config.wrap_parameters format: [:json]

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity 
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found 

  before_action :authorize_user

  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  private

  def authorize_user
    render json: { errors: "Not Authorized" }, status: :unauthorized unless current_user
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: ErrorSerializer.serialize(invalid.record.errors) }, status: :unprocessable_entity
  end

  def render_not_found(error)
    render json: { errors: {error.model => "Not Found"} }, status: :not_found 
  end 
end

#`render_not_found`` takes a param and then we'll use that param to figure out which controller is failing. 

# not preferred - do errors in serializer if going for backend 
  # def render_unprocessable_entity(invalid)
  #   errors_arr = invalid.record.errors.map{ |key, value| "#{key}: #{value}" }
  #   render json: { errors: errors_arr }, status: :unprocessable_entity
  # end