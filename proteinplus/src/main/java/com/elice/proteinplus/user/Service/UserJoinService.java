package com.elice.proteinplus.user.Service;

import com.elice.proteinplus.user.entity.User;
import com.elice.proteinplus.user.Repository.UserJoinRepository;
import com.elice.proteinplus.user.dto.JoinUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserJoinService {

    private final UserJoinRepository userJoinRepository;

    //회원가입
    public User join(JoinUserDTO joinUserDTO){

        User createUser = new User();
        createUser.create(joinUserDTO);

       User joinUser = userJoinRepository.save(createUser);

        return joinUser;
    }

    //아이디 중복체크
    public boolean idDuplicateCheck(String loginId){
        return userJoinRepository.existsByLoginId(loginId);
    }

    //이메일 중복체크
    public boolean emailDuplicateCheck(String email){
        return userJoinRepository.existsByEmail(email);
    }

}
