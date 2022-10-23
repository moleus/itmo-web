package com.moleus.web.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RestUtil {
    public static Optional<String[]> getMatch(String path, Pattern pattern) {
        Matcher matcher = pattern.matcher(path);
        List<String> matchedGroups = new ArrayList<>();

        if (matcher.find()) {
            for (int groupIndex = 1; groupIndex < matcher.groupCount(); groupIndex++) {
                matchedGroups.add(matcher.group(groupIndex));
            }
            return Optional.of(matchedGroups.toArray(String[]::new));
        }
        return Optional.empty();
    }
}
