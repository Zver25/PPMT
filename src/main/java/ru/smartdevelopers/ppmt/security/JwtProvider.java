package ru.smartdevelopers.ppmt.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import ru.smartdevelopers.ppmt.domains.User;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static ru.smartdevelopers.ppmt.security.SecurityConstants.EXPIRATION_TOKEN_TIME;
import static ru.smartdevelopers.ppmt.security.SecurityConstants.SECRET;

@Component
public class JwtProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    public String generate(Authentication authentication) {
        User user = (User)authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date expiredDate = new Date(now.getTime() + EXPIRATION_TOKEN_TIME);
        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userId);
        claims.put("username", user.getUsername());
        claims.put("fullname", user.getFullName());
        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiredDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public boolean validate(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
            return true;
        }
        catch (SignatureException e) {
            logger.debug("Invalid JWT signature", e);
        }
        catch (MalformedJwtException e) {
            logger.debug("Invalid JWT", e);
        }
        catch (ExpiredJwtException e) {
            logger.debug("Expired JWT", e);
        }
        catch (UnsupportedJwtException e) {
            logger.debug("Unsupported JWT", e);
        }
        catch (IllegalArgumentException e) {
            logger.debug("JWT claims is empty", e);
        }
        return false;
    }

    public Long getUserIdFromJwt(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = claims.getId();
        return Long.parseLong(id);
    }

}
