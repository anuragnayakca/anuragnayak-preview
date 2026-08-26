# Fails the build if an HTML output page is missing the shared document shell.
# This catches malformed or unrecognized front matter before deployment.
Jekyll::Hooks.register :site, :post_write do |site|
  failures = Dir.glob(File.join(site.dest, "**", "*.html")).select do |path|
    html = File.read(path, encoding: "UTF-8")
    !html.match?(/<!doctype\s+html/i) || !html.match?(/<title\b/i)
  end

  next if failures.empty?

  relative = failures.map { |path| path.sub(%r{^#{Regexp.escape(site.dest)}/?}, "") }
  raise Jekyll::Errors::FatalException, "Pages missing the site layout: #{relative.join(', ')}"
end
