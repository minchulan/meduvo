module CurrentUserConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
  end

  def set_current_user
    @current_user = User.find_by_id(session[:user_id]) if session[:user_id]
  end

  def authenticate_user
    return render json: { error: { User: 'Unauthorized' } }, status: :unauthorized unless session.include?(:user_id)
  end
end
