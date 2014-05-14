require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get sky_chart" do
    get :sky_chart
    assert_response :success
  end

  test "should get index" do
    get :index
    assert_response :success
  end

end
