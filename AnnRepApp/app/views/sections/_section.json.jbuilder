json.extract! section, :id, :title, :content, :part_id, :created_at, :updated_at
json.url user_report_section_url(current_user, @report, section, format: :json)
